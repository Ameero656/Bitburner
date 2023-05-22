/** @param {NS} ns */
export async function main(ns) {
	const host = ns.args[0]; //where virus script will live
	const target = ns.args[1]; //where virus script will attack
	const maxMoney = ns.getServerMaxMoney(target);

	/*
	hack time / hack thread = growtime / grow thread | growthtime *=growThread * hacktime/hackthread
	*/
	var growingTime = ns.getGrowTime(target);
	var hackingTime = ns.getHackTime(target);
	var weakeningTime = ns.getWeakenTime(target);

	var hackThreadCount = Math.floor(0.5 / ns.hackAnalyze(target));
	// var growThreadTimeRatio = Math.ceil(growingTime/9) * Math.ceil(hackingTime/9) / hackThreadCount;
	var growThreadCount = Math.floor(ns.growthAnalyze(target, 2)); // growThreadTimeRatio);
	var weakenThreadCount = Math.floor(hackThreadCount / 2); //(Hack threads / hackToWeakenRatio)

	const hackScript = 'virusHackScript.js';
	const growScript = 'virusGrowScript.js';
	const weakenScript = 'virusWeakenScript.js';

	var totalThreadCount = hackThreadCount + growThreadCount + weakenThreadCount;
	const maxThreadCount = ns.getServerMaxRam(host) / ns.getScriptRam(hackScript);
	var universalRatio = Math.floor(maxThreadCount / totalThreadCount);

	ns.tprint(`
	maxMoney:${maxMoney}
	growingTime:${growingTime}
	hackingTime:${hackingTime}
	weakeningTime:${weakeningTime}

	hackThreadCount:${hackThreadCount}

	growThreadCount:${growThreadCount}

	weakenThreadCount:${weakenThreadCount}

	totalThreadCount:${totalThreadCount}
	maxThreadCount:${maxThreadCount}
	universalRatio:${universalRatio}	

	
	`)

	var filenameArray = [hackScript, growScript, weakenScript];
	var threadArray = [hackThreadCount, growThreadCount, weakenThreadCount];


	for (let i = 0; i < filenameArray.length; i++) {
		let script = filenameArray[i];
		let threads = threadArray[i];
		ns.tprint("Filename:", script, "| Threads:", threads)

		let copied = ns.scp(script, host) //copy virus script to host
		copied = copied == true ? 'sucessful!' : 'unsucessful.';
		ns.tprint(`copying ${script}...${copied}`);

		var executed = ns.exec(script, host, Math.floor(threads * universalRatio), target);
		executed = executed > 1 ? "sucessful!" : 'unsucessful.';
		ns.tprint(`executing ${script}...${executed}`);
	}
}
