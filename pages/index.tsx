import {ExternalLinkIcon, RefreshIcon} from "@heroicons/react/outline"
import Link from "next/link";
import {CountUp} from 'countup.js'
import { useEffect, useState } from "react";
import axios from "axios";
import Typist from 'react-typist';

interface IRaceResult {
    id: number,
    position: number,
    reward: number,
    race: IRace
}

interface IRace {
  class: 1
  end: number,
  id: number,
  isEnded: boolean
  isScheduled: boolean
  isStarted: boolean
  length: number,
  roomId: string
  schedule: number,
  start: number,
  totalReward: number,
  total_registers: number,
  version: number,
  weatherFire: number,
  weatherHumidity: number,
  weatherLight: number,
  weatherWindDirection: number,
  weatherWindSpeed: number,
}

const Home = () => {

  const visDay = 200;
  const pegaC = 6;
  const vtDay = pegaC * visDay;
  const vtMonth = vtDay * 30;

  const goldCountToday = 0;
  const goldPercentToday = 33;
  const silverCountToday = 0;
  const silverPercentToday = 33;
  const bronzeCountToday = 0;
  const bronzePercentToday = 33;


  const id = "0x5CB790783984fF41D214e03dF10e7244603E361b";
  const gradient = 'from-rose-100 to-rose-400';
  const primary = 'rose-500';
  const iconClass = 'inline h-5 w-5';
  const apolloLink = 'https://apollo.pegaxy.io/personal/dashboard';
  const earnings = `https://api-apollo.pegaxy.io/v1/earnings/historical/user/${id}`;
  const pega = `https://api-apollo.pegaxy.io/v1/pegas/owner/user/${id}`;
  const history = `https://api.pegaxy.io/race/history/pega/`
  const stats = `https://api-apollo.pegaxy.io/v1/stats/game/total/user/${id}`;
  const assets = `https://api-apollo.pegaxy.io/v1/assets/count/user/${id}`;
  const getEarnings = async () => (await axios.get(earnings)).data;
  const getPega = async () => (await axios.get(pega)).data;
  const getStats = async () => (await axios.get(stats)).data;
  const getAssets = async () => (await axios.get(assets)).data;

  const [ raceHistory, setRaceHistory ] = useState<IRaceResult[]>([]);

  const auth= true;
  const refresh = () => {
    Promise.all([getEarnings(), getPega(), getStats(), getAssets()]).then(([ earnings, pega, stats, assets]) => {
      let energyCount = 0;
      let goldCount = 0;

        
      pega.forEach(async (p: any) => {
        console.log(p);
        //get race history for this pega
        let h
        try {
          h = (await axios.get(history + p.id)).data.data
        } catch (error) {
          h = []
        }
        
        console.log(h);
        h.forEach((r:IRaceResult) => {
          console.log(r);
          
        })
        
            
        energyCount += p.energy;
      });
      if(process.browser) {
        
        let demo = new CountUp('count', assets.lockedVis);
        let pega = new CountUp('pega', assets.pega);
        let energy = new CountUp('energy', energyCount);
        if (!demo.error && !pega.error) {
          demo.start();
          pega.start();
          energy.start();
        } else {
          console.error(demo.error);
        }
      }
    });
  }

  useEffect(
    () => {
      refresh();
    }
  )


  return (
    <div className={"bg-gradient-to-bl h-screen w-full overflow-hidden "+gradient}>
      <div className="mx-36 my-9 rounded-2xl bg-gradient-to-bl from-slate-700 to-gray-800 text-white">
        {auth?<>
        
      <div className="mx-12 my-9 w-max flex items-left justify-center h-full uppercase">
        <div className="flex flex-col">
        <span className="text-gray-300 mt-6 mb-2 text-xs font-bold">{id}</span>
        <h1 className="text-5xl font-extrabold uppercase -mt-2">Portfolio Overview</h1>
        <div className="flex justify-between w-full">
          <div className={"flex flex-col items-center font-bold uppercase text-rose-400"}>
          <div className="flex space-x-3 rounded-2xl hover:bg-rose-600 hover:text-white transition-all cursor-pointer px-2 pt-1">
            <Link href={apolloLink}>
            <span>View on Apollo</span>
            </Link>
            <ExternalLinkIcon className={iconClass} />
            </div>
          </div>
          <div className={"flex flex-col items-center font-bold uppercase text-rose-400"}>
          <div onClick={() => refresh()} className="flex space-x-3 rounded-2xl hover:bg-rose-600 hover:text-white transition-all cursor-pointer px-2 pt-1">
            <span>Refresh</span>
            <RefreshIcon className={iconClass} />
            </div>
          </div>
        </div>
        </div>

        <div className="mx-12 my-9 bg-red-600 uppercase font-bold h-max rounded-2xl px-3 py-1 place">sign out</div>
        
        </div>
        <div className="mx-12 flex">
        <div className="mr-18">
          <div id="pega" className="w-max flex flex-col space-y-2 font-bold text-7xl">
            0
          </div>
          <div className="flex mb-1 items-end font-bold">
            PEGA OWNED
          </div>
        </div>
        <div className="mx-36">
          <div id="energy" className="w-max flex flex-col space-y-2 font-bold text-7xl">
            0
          </div>
          <div className="flex mb-1 items-end font-bold">
            UNUSED ENERGY
          </div>
        </div>
        <div className="mx-36">
          <div id="count" className="w-max flex flex-col space-y-2 font-bold text-7xl">
            123
          </div>
          <div className="flex mb-1 items-end font-bold">
            UNCLAIMED VIS
          </div>
        </div>
        <div>
          
        </div>

        </div>


        <div className="mx-12 mt-9 flex">
        <div className="w-max text-2xl uppercase font-bold">Today's Progress</div>
          <div className="w-96 ml-2 border-b-2 mb-2 border-white"></div>
          
        </div>
        <div className="w-full flex">
          <div className="h-full flex mx-12 pt-9 border-l-2 border-white">
            <span className="text-amber-400 font-bold text-8xl mr-2 ml-8">{goldCountToday}</span>
            <div className="flex flex-col place-content-end">
              <span className="font-bold uppercase">gold</span>
              <span className="text-green-400 font-bold">(+{goldPercentToday}%)</span>
            </div>
            <span className="text-gray-200 font-bold text-8xl mr-2 ml-8">{silverCountToday}</span>
            <div className="flex flex-col place-content-end">
              <span className="font-bold uppercase">silver</span>
              <span className="text-green-400 font-bold">(+{silverPercentToday}%)</span>
            </div>
            <span className="text-yellow-800 font-bold text-8xl mr-2 ml-8">{bronzeCountToday}</span>
            <div className="flex flex-col place-content-end">
              <span className="font-bold uppercase">bronze</span>
              <span className="text-green-400 font-bold">(+{bronzePercentToday}%)</span>
            </div>
          </div>

        </div>
        <div className="h-full flex mx-12 my-1 pt-9 border-l-2 mb-2">
          Pega Scoreboard
          <Typist>
            Kriegsmarine
          </Typist>
          </div>

        
        
        </>
      : "Not authed"}
      </div>
    </div>
  )

  }

export default Home;
