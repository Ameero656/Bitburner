export async function main(ns) {
	let target = ns.args[0];
	let greed = ns.args[1];
	ns.tprint(target);
	const spacer = 20; //20ms intervles between scripts

	let hackThreads = Math.floor(greed / ns.hackAnalyze(target));
	let weakenHackThreads = Math.ceil(hackThreads / 25);
	let growthThreads = Math.ceil(ns.growthAnalyze(target, 2));
	let weakenGrowThreads = Math.ceil(growthThreads / 12.5);

	let hackDelay = ns.getGrowTime(target) - ns.getHackTime(target) + spacer; // 
	let weakenHackDelay = spacer;
	let growDelay = spacer;
	let weakenGrowDelay = ns.getWeakenTime(target) - ns.getGrowTime(target) + spacer;


	const virusInfo = {
		'hack': {
			threads: hackThreads,
			delay: hackDelay,
			fileName: 'virusHack.js'
		},
		'weakenHack': {
			threads: weakenHackThreads,
			delay: weakenHackDelay,
			fileName: 'virusWeaken.js'
		},
		'grow': {
			threads: growthThreads,
			delay: growDelay,
			fileName: 'virusGrow.js'
		},
		'weakenGrow': {
			threads: weakenGrowThreads,
			delay: weakenGrowDelay,
			fileName: 'virusWeaken.js'
		}
	}
	ns.tprint(Object.keys(virusInfo).length);
	// let batches = Math.floor(ns.getServerMaxRam(target) / totalThreads * ns.getScriptRam(scripts[0]));

	for (const property in virusInfo) {
		
		// for (let b = 0; b < batches; b++) {
		ns.tprint(virusInfo[property]);
		let virusDelay = virusInfo[property]['delay'];
		let virusThreads = virusInfo[property]['threads'];
		let script = virusInfo[property]['fileName'];
		let selectedServer = getAvalibleServers(ns, script);
			
		ns.tprint(`
iteraiton:${property}
selectedScript:${script}
selectedServer:${selectedServer}
virusDelay:${virusDelay}
virusThreads:${virusThreads}
 `)

		
		plantVirus(ns, script, selectedServer);
		executeVirus(ns, script, selectedServer, virusThreads, target, virusDelay);
	}

}

function executeVirus(ns, script, server, threads, target, virusDelayArray) {
	let executed = ns.exec(script, server, threads, target, virusDelayArray); // b is just id arg for multiple batches
	executed = executed > 1 ? 'Sucessful!' : 'Unsucessful.';
	ns.tprint(`Executing ${script} from ${server}...${executed} `)
}

function plantVirus(ns, script, selectedServer) {
	let copied = ns.scp(script, selectedServer, 'home');
	copied = copied ? 'Sucessful!' : 'Unsucessful.';
	ns.tprint(`Copying ${script} to ${selectedServer}...${copied} `)
	return;
}


function getAvalibleServers(ns, script) {
	let skillServers = ['Black', 'Red', 'Home'];
	let servers = ns.scan('home');
	for (let i = 0; i < servers.length; i++) { 
		let server = servers[i];
		if (skillServers.includes(server.slice(0, 2))) {
			continue;
		}
		if (ns.getServerMaxRam(server) - ns.getServerUsedRam(server) >= ns.getScriptRam(script)) {
			return server;
		} else continue;
	}
}
