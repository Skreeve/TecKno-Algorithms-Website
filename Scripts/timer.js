let time = 0
let stopped
let running = 0

function timer()
{
	if (running)
	{
		$("#timer").html(format(time))
		time++
		stopped = setTimeout(timer, 10)
	}
}

function startStopwatch()
{
	console.log("Starting stopwatch")
	if(running)
		stopStopwatch()
	else{
		running = 1
		timer()
	}
}

function stopStopwatch()
{
	running = 0
	$("#timer").html(format(time))
}

function resetStopwatch()
{
	time = 0
	running = 0
	clearTimeout(0)
	$("#timer").html(format(0))
}

function format(t)
{
	let mil
	let sec
	let min
	mil = place(t%100)
	sec = place(parseInt(t/100)%60)
	min = place(parseInt(t/6000))
	return min + ':' + sec + ':' + mil
}

function place(n)
{
	return n < 10 ? '0' + n : n
}
