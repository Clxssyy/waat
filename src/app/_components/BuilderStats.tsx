const BuildStats = () => {
  return (
    <div className="flex min-w-1/6 flex-col gap-2 border border-neutral-700 bg-neutral-800 p-2">
      <h2 className="text-center">Stats</h2>
      <div className="flex flex-col text-sm">
        <p className="flex h-12 items-center justify-between bg-neutral-700 px-2 py-1">
          <span>Power</span>
          <span>0</span>
        </p>
        <h2>Basic</h2>
        <div>
          {Array.from([
            "HP",
            "HP Recovery",
            "MP",
            "MP Recovery",
            "Out-of-Combat MP Recovery",
            "Movement Speed",
            "Mount Max HP",
            "Mount Movement Speed",
            "Mount Sprint Speed",
            "Carry Weight",
            "Experience Bonus",
            "Starfall Token Acquisition Bonus",
            "Loot Bonus",
            "Gathering Rate Bonus",
            "Gathering Yield Bonus",
          ]).map((value, i) => (
            <p
              key={i}
              className="flex justify-between px-2 py-1 odd:bg-neutral-700"
            >
              <span>{value}</span>
              <span>0</span>
            </p>
          ))}
        </div>
        <h2>Attack</h2>
        <div>
          {Array.from([
            "Attack Power",
            "Attack Speed",
            "Basic Attacks Per Second",
            "Basic Attack Bonus",
            "Basic Attack Lifesteal",
            "Critical Rate",
            "Skill Casting Speed",
            "Skill Cooldown Rate",
            "Skill Bonus",
            "Physical Attack",
            "Base Damage and Healing Bonus",
            "Damage Bonus (PvP)",
            "Damage Bonus (PvE)",
            "Physical Damage Bonus",
            "Magic Damage Bonus",
            "Healing Bonus",
            "Control Accuracy",
            "Control Boost (PvP)",
            "Control Boost (PvE)",
            "Tenacity Penetration",
          ]).map((value, i) => (
            <p
              key={i}
              className="flex justify-between px-2 py-1 odd:bg-neutral-700"
            >
              <span>{value}</span>
              <span>0</span>
            </p>
          ))}
        </div>
        <h2>Defense</h2>
        <div>
          {Array.from([
            "Armor",
            "Magic Resistance",
            "Damage Resistance (PvP)",
            "Damage Resistance (PvE)",
            "Dodge Rate",
            "Block",
            "Control Dodge Rate",
            "Control Resistance (PvP)",
            "Control Resistance (PvE)",
            "Healing Received",
            "Tenacity",
          ]).map((value, i) => (
            <p
              key={i}
              className="flex justify-between px-2 py-1 odd:bg-neutral-700"
            >
              <span>{value}</span>
              <span>0</span>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BuildStats;
