//toggles drum button (button that indicates whether that specific drum sound will play at the specific time)
function toggleDrum(event)
{
  if (event.target.className == "unselected drumbutton")
  {
    event.target.className = "selected drumbutton";
  }
  else if (event.target.className == "selected drumbutton")
  {
    event.target.className = "unselected drumbutton";
  }
  else
  {
    alert("Error!  (un)selected class not in use");
  }
}

//toggles the play/pause button and stops audio when stop button pressed
function togglePlayPause()
{
  document.getElementById("analyser").style.visibility = 'visible';
  if (document.getElementsByClassName("selected drumbutton")[0])
  {
    if (document.getElementById("playbutton").className == "notDrumming")
    {
      var drumbuttonsGood = validNoDrumbuttons();
      if (drumbuttonsGood.testResult)
      {
        document.getElementById("playbutton").className = "drumming";
        document.getElementById("playbutton").innerHTML = "Stop";
      }
      else
      {
        alert("Error!  Intervals not equal for all drums");
      }
    }
    else if (document.getElementById("playbutton").className == "drumming")
    {
      stopBeat();
    }
    else
    {
      alert("Error! (not)drumming class not in use");
    }
  }
  else
  {
    if (document.getElementById("playbutton").className == "drumming")
    {
      stopBeat();
    }
  }
}

//plays entire drum beat
function playBeat()
{
  var interval = 0;
  var drumbuttonsGood = validNoDrumbuttons();
  var bpm = 120.0 / 2;
  var tempo = 1 / bpm * 1 / 4 * 60 * 1000;
  cycleIntervals(interval, drumbuttonsGood.noIntervals, tempo);
}

//plays drum
function playDrum(drum, sound, interval)
{
  if(document.getElementById(drum).getElementsByClassName("drumbutton")[interval].className == "selected drumbutton")
  {
    resetSound(sound);
    document.getElementById(sound).play();
    document.getElementById(sound).className = "playing";
  }
}
// requires audio tags to be listed in the same order as drum rows
/*function playDrums(interval)
{
  var audioclip = 0;
  for (i = 0; i < document.getElementsByClassName("drumrow").length; i++)
  {
    if(document.getElementsByClassName("drumrow")[i].getElementsByClassName("drumbutton")[interval].className == "selected drumbutton")
    {
      document.getElementsByTagName("audio")[i].mediaGroup = "group" + interval;
      audioclip = i;
    }
  }
  document.getElementsByTagName("audio")[audioclip].play();
}*/

//pauses the audio sound and resets the time back to 0
function resetSound(sound)
{
  document.getElementById(sound).pause();
  document.getElementById(sound).currentTime = 0;
  document.getElementById(sound).className = "silent";
}

//confirms that HTML is coded properly, so that each drum (drumrow) has the same number of intervals
//also returns the number of intervals available for the drum beat
function validNoDrumbuttons()
{
  var validNoDrumbuttons = false;
  var posTests = 0;
  var avgIntervals = document.getElementsByClassName("drumbutton").length / document.getElementsByClassName("drumrow").length;
  for (i = 0; i < document.getElementsByClassName("drumrow").length; i++)
  {
    if (avgIntervals == document.getElementsByClassName("drumrow")[i].getElementsByClassName("drumbutton").length)
    {
      posTests++;
    }
  }
  if (posTests == document.getElementsByClassName("drumrow").length)
  {
    validNoDrumbuttons = true;
  }
  return {testResult : validNoDrumbuttons, noIntervals : avgIntervals};
}

//loops through intervals to play drum beat
function cycleIntervals(interval, noIntervals, timing)
{
  console.log(interval + " " + noIntervals + " " + timing)
  if (document.getElementById("playbutton").className == "drumming")
  {
    for (i = 0; i < document.getElementsByClassName("drumrow").length; i++)
    {  //plays all drums for a given interval (whether a drum is selected and/or stays silent is handles by playDrum)
      playDrum(document.getElementsByClassName("drumrow")[i].id, document.getElementsByTagName("audio")[i].id, interval);
    }
    //playDrums(interval);
    interval++;
    if (interval >= noIntervals)
    {
      interval = 0;
    }
    setTimeout(function(){ cycleIntervals(interval, noIntervals, timing); }, timing);
  }
}

//stops drum beat from looping and resets all audio files
function stopBeat()
{
  for (i = 0; i < document.getElementsByClassName("drumrow").length; i++)
  {  //stops all drum sounds when play button is toggled off (stop)
    resetSound(document.getElementsByTagName("audio")[i].id);
  }
  document.getElementById("analyser").style.visibility = 'hidden';
  document.getElementById("playbutton").className = "notDrumming";
  document.getElementById("playbutton").innerHTML = "Play";
}
