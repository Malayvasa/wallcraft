import data from '../data.json';
import { useState } from 'react';
import useSound from 'use-sound';
import Place from '../sounds/place.mp3';
import ChestOpen from '../sounds/chest-open.mp3';
import ChestClose from '../sounds/chest-close.mp3';

export default function ItemPicker(props) {
  const [Data, setData] = useState(data);
  const [isPresetVisible, setIsPresetVisible] = useState(false);

  const presets = [
    {
      name: 'merry craftmas',
      icons: ["spruce_sapling", "snowball", "snow"],
      color: '#850000',
    },
    {
      name: 'rich flex',
      icons: ["diamond", "golden_carrot", "diamond_pickaxe", "emerald", "amethyst_shard"],
      color: '#54D6AC',
    },
    {
      name: 'sky is the limit',
      icons: ['elytra', 'firework_rocket', 'nether_star', 'tipped_arrow'],
      color: '#bfeaf5',
    },
    {
      name: 'aqua blue',
      icons: ["fishing_rod", "tropical_fish", "tropical_fish_bucket", "kelp"],
      color: '#82aae3',
    },
    {
      name: "0s and 1s",
      icons: ["barrier", "blaze_rod"], 
      color: '#000000',
    },
    {
      name: 'ender danger',
      icons: ["ender_pearl", "blaze_powder", "ender_eye", "blaze_rod"],
      color: '#000000',
    },
    {
      name: 'happy birthday to me',
      icons: ["cake", "light", "red_candle", "light", "blue_candle"],
      color: '#DC3535',
    },
    {
      name: 'mcCraft supreme',
      icons:['cooked_chicken', 'cooked_cod', 'mutton', 'cooked_porkchop', 'cooked_rabbit'],
      color:'#DC3535',
    },
    {
      name: 'flower power',
      icons: ['dandelion', 'poppy', 'blue_orchid', 'allium', 'red_tulip', 'oxeye_daisy', 'cornflower', 'lily_of_the_valley', 'lilac'],
      color: '#DFFFE4',
    },
    {
      name: 'redstone',
      icons: ["redstone", "redstone_wall_torch", "repeater", "piston", "redstone_block", "redstone_wire"],
      color: '#650000',
    },
    {
      name: 'queer pride',
      icons: ["red_dye", "orange_dye", "yellow_dye", "green_dye", "blue_dye", "purple_dye"],
      color: '#FFFFFF',
    },
    {
      name: 'spruce banner',
      icons: ["spruce_sapling", "spruce_planks", "green_banner"],
      color: '#9bc063',
    },  
    {
      name: 'ingot pot',
      icons: ["gold_ingot", "iron_ingot", "copper_ingot", "brick", "netherite_ingot", "nether_brick"],
      color: '#BBBBBB',
    },
    {
      name: 'diamond tools',
      icons: ['diamond_sword', 'diamond_pickaxe', 'diamond_axe', 'diamond_shovel', 'diamond_hoe', 'diamond_helmet', 'diamond_chestplate', 'diamond_leggings', 'diamond_boots'],
      color: '#B9F8FF',
    },
    {
      name: 'iron tools',
      icons: ['iron_sword', 'iron_pickaxe', 'iron_axe', 'iron_shovel', 'iron_hoe', 'iron_helmet', 'iron_chestplate', 'iron_leggings', 'iron_boots'],
      color: '#F8F8F8',
    },
    {
      name: 'gold tools',
      icons: ['golden_sword', 'golden_pickaxe', 'golden_axe', 'golden_shovel', 'golden_hoe', 'golden_helmet', 'golden_chestplate', 'golden_leggings', 'golden_boots'],
      color: '#FFD982',
    },
    {
      name: 'netherite tools',
      icons: ['netherite_sword', 'netherite_pickaxe', 'netherite_axe', 'netherite_shovel', 'netherite_hoe', 'netherite_helmet', 'netherite_chestplate', 'netherite_leggings', 'netherite_boots'],
      color: '#1C0202',
    },
    {
      name: 'wooden tools',
      icons: ['wooden_sword', 'wooden_pickaxe', 'wooden_axe', 'wooden_shovel', 'wooden_hoe'],
      color: '#452409',
    },
    {
      name: 'stone tools',
      icons: ['stone_sword', 'stone_pickaxe', 'stone_axe', 'stone_shovel', 'stone_hoe'],
      color: '#8E8E8E',
    },
    {
      name: 'hoes',
      icons: ['wooden_hoe','stone_hoe','iron_hoe','golden_hoe','diamond_hoe','netherite_hoe'],
      color: '#000',
    },
    {
      name: 'swords',
      icons : ['diamond_sword', 'wooden_sword', 'stone_sword', 'golden_sword', 'iron_sword', 'netherite_sword'],
      color: '#000',
    },
    {
      name: 'amethyst',
      icons : ['small_amethyst_bud', 'medium_amethyst_bud', 'large_amethyst_bud', 'amethyst_cluster', 'amethyst_shard'],
      color : '#cfbaf0',
    },
  ];

  const [searchPreset, setSearchPreset] = useState(presets);
  const [place] = useSound(Place, { volume: 0.075 });
  const [preset] = useSound(ChestOpen, { volume: 0.045 });
  const [inventory] = useSound(ChestClose, { volume: 0.045 });

  function handleClick(name) {
    props.onChange(name);
    place();
  }

  function handlePresetClick(preset) {
    props.presetChange(preset);
    place();
  }

  function handleSearch(string) {
    const searchString = string.toLowerCase();
    if(isPresetVisible){
      const filteredPresets = presets.filter((preset) => preset.name.includes(searchString));
      setSearchPreset(filteredPresets);
    }else{
      const filteredData = data.filter((item) => item.name.includes(searchString));
      setData(filteredData);
    }
  }

  return (
    <div className="p-4 container w-full flex flex-col h-[354px]">
      <div className="flex flex-col w-full md:flex-row gap-4 md:gap-8 pb-8 md:items-center md:justify-center">
        <div className="flex mr-4 gap-x-4">
          <div
            className={`mine mb-2 p-1 pl-2 w-18 cursor-pointer h-max ${
              isPresetVisible ? 'text-[#555]' : 'input'
            }`}
            onClick={() => {
              inventory();
              setIsPresetVisible(false);
              handleSearch('');
              document.getElementById('search').value = '';
            }}
          >
            Inventory
          </div>
          <div
            className={`mine mb-2 p-1 pl-2 w-18 cursor-pointer h-max ${
              isPresetVisible ? 'input' : 'text-[#555]'
            }`}
            onClick={() => {
              preset();
              setIsPresetVisible(true);
              handleSearch('');
              document.getElementById('search').value = '';
            }}
          >
            Presets
          </div>
        </div>

        <div className="search-container p-1 px-4 flex-grow md:w-1/2">
          <input
            className="minecraft placeholder-[#555] w-full outline-none bg-transparent"
            type="text"
            id = "search"
            placeholder="Search"
            onChange={(e) => {
              handleSearch(e.target.value);
            }}
          />
        </div>
      </div>
      {isPresetVisible ? (
        <div className='flex flex-col gap-y-0.5 box h-full overflow-y-scroll'>
          {searchPreset.map((item) => (
            <div
              className="preset cursor-pointer box-border border-4 border-[#777] w-full minecraft"
              onClick={() => {
                handlePresetClick(item);
              }}
            >
              
              <div className="flex justify-between w-full">
              <div className='flex-grow capitalize'>{item.name}</div>
              <div className='flex items-center'>
                {item.icons.map((icon) => (
                  <div className="flex items-center w-4 h-4">
                    <div className="">
                      <img
                        className=""
                        alt={icon}
                        src={require(`../icons/${icon}.png`)}
                      />
                    </div>
                  </div>
                ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-5 w-full md:grid-cols-6 lg:grid-cols-9  h-full overflow-y-scroll">
          {Data.map((item) => (
            <div
              key={item.id}
              className="box m-1 w-12 h-12 flex justify-center items-center"
              //add an onclick event to add the selected ingredient id to the state variable
              onClick={() => {
                handleClick(item.name);
              }}
            >
              <div className="">
                <img
                  className=""
                  alt={item.label}
                  src={require(`../icons/${item.name}.png`)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
