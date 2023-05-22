export async function main(ns) {
	let target = ns.args[0];
	let greed = ns.args[1];

	const spacer = 20; //20ms intervles between scripts

	let hackThreads = Math.floor(greed / ns.hackAnalyze(target));
	let weakenHackThreads = Math.ceil(hackThreads / 25;
	let growThreads = Math.ceil(ns.growAnalyze(target, 2));
	let weakenGrowThreads = Math.ceil(growThreads / 12.5);

	let hackDelay = ns.hackTime(target) - ns.growTime(target) + spacer; // 
	let weakenHackDelay = spacer;
	let growDelay = spacer;
	let weakenGrowDelay = ns.weakenTime(target) - ns.growTime(target) + spacer;

	
	const virusInfo = {
		hack:  {
			threads : hackThreads,
			delay : hackDelay,
			fileName : 'virusHack.js'
		},
		weakenHack: {
			threads : weakenHackThreads,
			delay : weakenHackDelay,
			fileName : 'virusWeaken.js'
		},
		grow: {
			threads : growThreads,
			delay : growDelay,
			fileName : 'virusGrow.js'
		},
		weakenGrow: {
			threads : weakenGrowThreads,
			delay : weakenGrowDelay,
			fileName : 'virusWeaken.js'
		}
	}
	let batches = Math.floor(ns.getServerMaxRam(target) / totalThreads * ns.getScriptRam(scripts[0]));

	for (let i = 0; i < virusInfo.length; i++) {
		for (let b = 0; b < batches; b++) {
			let virusDelay = virusInfo[i][delay];
			let virusThreads = virusInfo[i][threads];
			let script = virusInfo[i][fileName];
			let selectedServer = getAvalibleServers(ns, script);
			plantVirus(ns, script, selectedServer, virusThreads[i], target, virusDelay, b);
			executeVirus(ns, script, selectedServer);
		}

	}




}

function executeVirus(ns, script, server, threads, target, virusDelayArray, i, b) {
	let executed = ns.exec(script, server, threads, target, virusDelayArray, b); // b is just id arg for multiple batches
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
	for (let i = 0; i < servers.length; i++) { }
	let server = servers[i];
	if (skillServers.includes(server.slie(0, 2))) {
		continue
	}
	if (ns.getServerMaxRam(server) - ns.getServerUsedRam(server) >= ns.getScriptRam(script)) {
		return server;
	} else continue;
}
}
