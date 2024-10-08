const keywords: Record<string, string> = {
  Agile:
    "After you perform a standard move, gain X dodge token(s). Note: climbing, embarking, disembarking, pivoting, and reversing are not standard moves. This effect does not trigger abilities that occur after dodge actions are performed.",
  AI: "Unless you have a faceup order token, your first action must be one of the following, if able: X",
  Aid: "When you would gain an aim, dodge, or surge token, another friendly unit of the affiliation or type listed at range 1 and in LOS may gain that token instead. If they do, you gain 1 suppression token.",
  "Allies of Convenience":
    "This unit may issue orders to friendly Mercenary units regardless of affiliation. During army building, you may have 1 extra Mercenary unit of any rank if you have at least one unit with this keyword. You cannot exceed normal rank limits this way.",
  "Area Weapon":
    "When using this weapon, perform a separate ranged attack against each friendly and enemy unit within LOS and this weapon's range, even if that unit is engaged. Area Weapon is indicated by a yellow range icon.",
  Arm: "Place X of the specified charge tokens within range 1 and in LOS of your unit leader. Charge tokens cannot overlap objective, condition, or other charge tokens and must be placed on a flat surface.",
  Armor: "While defending, cancel up to X hit results. (Cancel all if no X listed)",
  Arsenal: "While attacking, choose up to X of your weapons to add to the attack pool.",
  "Ataru Mastery":
    "You can perform up to 2 attack actions. After you perform an attack, gain 1 dodge token. After defending, you gain 1 aim token. When defending against a ranged attack, if you spend a dodge token, the attacker suffers 1 wound for each surge result rolled; You cannot cause wounds to the attacking unit if the attack has IMMUNE:DEFLECT",
  Authoritative:
    "Once per Command Phase, when you would be issued an order, you may instead issue an order to a friendly unit at range 1-2",
  "Bane Token":
    'Bane tokens ("Here I Am", "Smoke and Mirrors", "Kablamo!") are placed facedown, they cannot overlap objective or condition tokens. When an enemy mini moves, deploys, or is placed at Range 1 with LOS to the token, the token is revealed, its effect is resolved, then the token is removed. Minis cannot overlap Bane tokens.',
  "Kablamo!":
    'This token detonates using the weapon on Cad Bane\'s "I Make the Rules Now" Command Card.',
  "Smoke and Mirrors": "No effect.",
  "Here I Am":
    'If Cad Bane is not defeated, replace this token with him. If he was not already on the battlefield, he issues himself an order. At the start of each round, a player may reveal a friendly "Here I Am" token and resolve it.\n',
  Barrage:
    "If you do not use ARSENAL during your activation, you may make 2 attack actions.",
  Beam: "During the Declare Additional Defender step, you may choose up to X different targets using only this weapon. Additional targets must be against an enemy unit that is in LOS and within range 1 of the last defending unit declared. These additional attacks do not generate further attacks. Additional targets may be beyond this weapon's range.",
  Blast: "Ignore cover.",
  Block: "While defending, if you spend a dodge token, you gain surge to block.",
  Bolster:
    "As an action, you may choose up to X friendly units at range 1. Each chosen unit gains 1 surge token.",
  Bounty:
    "After setup, place a victory token on an enemy commander's or operative's card. If you defeat a unit with a victory token, move that token to your card. At the end of the game, the controlling player gains one victory token if you have one or more victory tokens on your card from defeating a marked unit.",
  Cache:
    "During Setup, place the listed tokens on this Upgrade Card. The unit owning the card may spend those tokens.",
  "Calculate Odds":
    "Choose a friendly trooper unit at range 1 and in LOS. It gains 1 aim, 1 dodge, and 1 suppression token",
  Charge: "After you perform a move action, you may perform a free melee attack action.",
  "Climbing Vehicle": "You are treated as a trooper for the purposes of climbing.",
  Compel:
    "After another friendly unit at range 1-2 of you rallies, if it is suppressed but not panicked, it may gain 1 suppression token to perform a free move action.",
  Contingencies:
    "When building your command hand, set aside X additional Command Cards facedown. When revealing a Command Card, you may swap it for a Contingency Card with the same number of pips. (See Rulebook)",
  Coordinate:
    "After you are issued an order, you may issue an order to a friendly unit with the name or type specified by X at range 1. Multiple Coordinates do not allow multiple orders to be issued, but do allow for each option listed to be used.",
  Counterpart:
    "While building an army, this mini must be added to an X unit. (See Rulebook)",
  Cover: "While defending against a ranged attack, improve your cover by X.",
  "Covert Ops":
    "When you deploy, you may change your rank to Operative. If you do, gain INFILTRATE. You cannot do this if there are no other commanders in your army.",
  "Creature Trooper":
    "You can:  obscure other minis and provide light cover while doing so, pivot and reverse, displace troopers when moving through them. You do not:  improve your cover while you have 1 or more suppression tokens, get cover from barricades, embark or disembark, use CLAIM/SABOTAGE/REPAIR abilities, be displaced",
  Critical:
    "While converting attack surges, you may convert up to X surge results to critical results.",
  Cumbersome:
    "You cannot move prior to attacking with this weapon, unless the move is a pivot.",
  Cunning:
    "When a Command Card belonging to you is revealed, if there would be a tie for priority, treat your Command Card as though it had 1 fewer pip.",
  Cycle: "At the end of your activation, if you did not use this card, ready it.",
  "Danger Sense":
    "You may choose not to remove up to X of your suppression tokens (including 0). While defending against a ranged attack, roll 1 extra defense die for each suppression token you have, adding up to X extra dice.",
  Dauntless:
    "After you rally, if you are suppressed but not panicked, you may gain 1 suppression token to perform a free move action. A Dauntless unit cannot be affected by COMPEL.",
  Defend: "When you are issued an order, you gain X dodge tokens.",
  Deflect:
    "While defending, if you spend a dodge token, any defense surge results are converted to block results; if it's a ranged attack, the attacker suffers 1 wound for each defense surge rolled.",
  Demoralize:
    "After your Rally step, add up to X total suppression tokens to enemy units at range 1-2.",
  Detachment:
    "During army building, you may only be included if a unit that has the name or type specified by X is also included in your army. Each unit with the DETACHMENT keyword requires a corresponding unit that matches the unit name or type specified. When you deploy, you must be within speed-1 and height 1 of the corresponding unit. You do not need to be within your deployment zone. See Rulebook.",
  Detonate:
    "After a unit controlled by any player performs an action, you may detonate up to X of the specified friendly charge tokens. See Rulebook.",
  Direct:
    "During the Command Phase, you may issue an order to a friendly unit with X at range 1-2.",
  Disciplined: "When you are issued an order, you may remove up to X suppression tokens.",
  Disengage: "You may perform moves while engaged with 1 unit.",
  Distract:
    "Choose an enemy trooper at range 1-2 and in LOS. Until the end of the round, you lose INCONSPICUOUS and when that unit performs an attack, it must attack you, if able.",
  Divulge:
    "You may reveal this card at the phase or step indicated. If you do, resolve its DIVULGE effect then return it to your hand.",
  "Djem So Mastery":
    "While defending, if you spend a dodge token, you gain surge to block. If at least 1 hit or crit result was canceled, the attacker suffers 1 wound. Attacking unit can not be wounded this way if attack has Immune: Deflect.",
  "Droid Trooper":
    "Droid troopers do not lose actions and do not gain cover from suppression. Droids can still become panicked.",
  Duelist:
    "While performing a melee attack, if you spend an aim token, gain Pierce 1. While defending against a melee attack, if you spend a dodge token, gain Immune:  Pierce. You still get the tokens' regular effects.",
  "Emplacement Trooper":
    "You can:  pivot, reverse. You cannot:  climb, use CLAIM/SABOTAGE/REPAIR, be displaced, be moved through by ground vehicles. This unit does not obscure LOS.",
  Enrage:
    'While you have X or more wound tokens, treat your courage as "-", gain CHARGE, and lose any suppression tokens.',
  Entourage:
    "While building an army, ignore the rank of 1 X unit towards the maximum. During the Command Phase, you may issue an order to a friendly X unit at range 1-2.",
  Equip: "The listed upgrades must be equipped to this unit.",
  Exemplar:
    "While at range 1-2 and in LOS of this unit, friendly units can spend aim, dodge, and surge tokens from this unit as if they had them.",
  "Expert Climber":
    "When this unit performs a climb, it may move a vertical distance up to height 2.",
  "Field Commander":
    "After a friendly neutral Command Card is played, you may be nominated as commander. Friendly units within command range of you may treat their courage as 2 when checking for panic. See Rulebook.",
  "Fire Support":
    "When another friendly unit performs a ranged attack, if you have a faceup order token and unengaged, each mini in your unit may add an eligible weapon to the attack pool if you have range and LOS. If you do, flip your order token facedown. Limit 1 FIRE SUPPORT per attack pool. Note:  Can still be used even if a unit would panic during its activation. Only the main unit attacking determines cover, LOS, and surges.",
  Fixed:
    "To add this weapon to the attack pool, the defender must have at least 1 mini partially inside the specified arc.",
  Flawed: "Add your flaw card to an opponents hand.",
  "Flexible Response": "This unit must equip X Heavy Weapon upgrades.",
  "Full Pivot": "When you pivot, you can pivot up to 360 degrees.",
  Generator: "During the End Phase, flip X inactive shield token(s).",
  "Graffiti Token":
    "During the Rally step of a friendly unit's activation:  if it has LOS to a friendly graffiti token at range 1-2, it may roll 1 additional die; if it has LOS to an enemy graffiti token at range 1-2, it must roll 1 fewer die, to a minimum of 1.",
  Grounded: "You cannot climb.",
  Guardian:
    "While a friendly trooper unit at range 1 and in LOS is defending against a ranged attack, it may cancel up to X hit results. For each result canceled this way, roll 1 of your defense dice. Convert any surges, then suffer 1 wound for each blank result.",
  Guidance:
    "Choose another friendly trooper at range 1-2 to perform a free non-attack action.",
  Gunslinger:
    "During the Declare Additional Defender step, you may declare an additional defender using a single weapon used in another attack. This can only be done once per attack sequence.",
  "Heavy Weapon Team":
    "You must equip a Heavy Weapon upgrade card. The mini added by that card is your unit leader.",
  "High Velocity":
    "While attacking, if each weapon in your attack pool has HIGH VELOCITY, the defender cannot spend dodge tokens.",
  Hover:
    "You can reverse, strafe, and standby. You are treated as a ground vehicle by other units. See Rulebook.",
  Hunted:
    "When you are defeated, replace this mini with an unclaimed The Asset token. Each trooper may Claim this token as an action. If an enemy unit has claimed this token at the end of the game, the controlling player gains 1 victory token.",
  Immobilize:
    "A unit suffering 1 or more wounds from an attack pool with this weapon gains X immobilize tokens. Reduce a unit's max speed by 1 per immobilize token. A unit with max speed 0 and one or more immobilize tokens cannot perform moves of any kind. Remove all of a unit's immobilize tokens at the end of its activation.",
  Immune: "X cannot be used against you.",
  Impact:
    "While attacking a unit that has ARMOR, change up to X hit results to crit results.",
  Impervious:
    "While defending, if the attack pool has PIERCE X, roll X additional defense dice. Do not roll these additional dice if you have IMMUNE: PIERCE.",
  Incognito:
    "You cannot be attacked by enemy units beyond range 1, or satisfy Victory conditions on an Objective Card. Lose all effects of Incognito if you perform an objective card action, and attack, or defend against an enemy attack.",
  Inconspicuous:
    "If you have at least one suppression token, an enemy unit must target another unit, if able. During your Rally step, you may choose not to remove any number of your suppression tokens.",
  Independent:
    "At the start of the Activation Phase, if you do not have an order token, gain X tokens.",
  Indomitable: "During your Rally step, roll red defense dice instead of white.",
  Infiltrate: "You may deploy anywhere beyond range 3 of all enemy units.",
  Inspire:
    "After your Rally step, remove up to X total suppression tokens from other friendly units at range 1-2.",
  Ion: "A vehicle or droid wounded by an attack that included this weapon gains X ion tokens. At the start of the Modify Attack Dice step, before any other effects, any unit defending against this weapon must flip an active shield token, if able, for each hit or critical result, up to X.",
  "Ion Token":
    "At the start of a unit's activation, if it has 1 or more ion tokens, it loses one action for each ion token. At the end of a unit's activation, it removes any ion tokens it has. A unit may still perform free actions if it loses both of its actions due to ion tokens.",
  "Jedi Hunter":
    "While attacking a unit that has a Force upgrade icon, you gain surge to crit.",
  Jump: "Perform a move during which you ignore terrain that is height X or lower, measuring height from starting position. This is treated as a move action.",
  "Juyo Mastery":
    "While you are wounded, you can perform 1 additional action during your activation. Limit 2 move actions.",
  "Latent Power":
    "At the end of your activation, you may gain 1 suppression token to roll 1 red defense die. On a focus result, give an enemy unit at range 1 and give them 2 suppression tokens and 2 immobilize tokens. On a blank result, remove 1 wound or 1 poison token from a friendly non-droid trooper at range 1.",
  Leader: "This mini is your unit leader. Limit 1 LEADER per unit.",
  Lethal:
    "You may spend up to X aim tokens during the Modify Attack Dice step. If you do, the attack pool gains Pierce 1 for each aim token spent.",
  "Light Transport:  Closed":
    "You may transport X friendly trooper units that consists of exactly 1 small base mini.",
  "Light Transport:  Open":
    "You may transport X friendly trooper units that consists of exactly 1 small base mini. After defending, if you suffered 1 or more wounds, each unit you are transporting suffers 1 wound.",
  Loadout:
    "During Army Building, for each Upgrade Card you purchase, select another Upgrade Card of equal or lesser value and set it aside. When you deploy, you may swap any of your equipped upgrades with its set-aside counterpart.",
  "Long Shot":
    "While attacking, spend up to X aim tokens to increase this weapon's maximum range by 1 for each aim token spent.",
  "Low Profile":
    "While defending against a ranged attack, if a you have cover and cancel hit results during Apply Cover, cancel one additional hit result. No effect if cover value is reduced to zero via Sharpshooter.",
  "Makashi Mastery":
    "While performing a melee attack, you may reduce the PIERCE value of your melee weapon by 1. If you do, the defender cannot use IMMUNE: PIERCE or IMPERVIOUS.",
  Marksman:
    "After converting attack surges, you can spend any nunber of aim tokens. For each token spent, convert a blank to a hit, a hit to a crit, or spend 2 tokens to convert a blank to a crit.",
  "Master of the Force":
    "At the end of its activation, this unit may ready up to X of its exhausted Force upgrade cards.",
  Nimble: "After defending, if you spent 1 or more dodge tokens, gain 1 dodge token.",
  Noncombatant:
    "This mini cannot use any weapons and wounds must be assigned to other non-unit leader minis first.",
  Observe: "Choose an enemy unit at range 1-3 and in LOS. It gains X observation tokens.",
  Outmaneuver: "You can spend dodge tokens to cancel critical hit results.",
  Override:
    "When a friendly unit begins its activation at range X, you may gain 1 suppression token. If you do, that unit ignores AI during its activation.",
  Overrun:
    "A unit may make X overrun attacks during its activation. A unit can perform an overrun attack after it makes a standard move during which one of its minis bases overlapped an enemy mini's base. After completing the move and resolving any displacement of the enemy unit, perform an attack against the unit you moved through, ignoring range. You can form only one attack pool, using only OVERRUN weapons and only adding the overrun weapon once, even if multiple minis are in the attack. If a unit has OVERRUN greater than 1, it must perform a separate move for each overrun attack.",
  Permanent:
    "This card is not discarded at the End Phase, its effect persists as long as it's in play.",
  Pierce: "While attacking, cancel up to X block results.",
  Plodding: "During your activation, you can perform only 1 move action.",
  Poison:
    "A non-droid trooper unit suffering wounds from this weapon gains X poison tokens.",
  "Poison Token":
    "At the end of a unit's activation, it suffers 1 wound for each poison token it has, then discards each poison token it has. Vehicles and droid trooper units cannot gain poison tokens.",
  Precise: "When you spend an aim token, reroll up to X additional dice.",
  Programmed: "During Army Building, you must equip at least 1 Protocol upgrade",
  "Pulling the Strings":
    "Choose a friendly trooper unit at range 1-2. That unit may perform a free attack action or a free move action.",
  "Quick Thinking": "Gain 1 aim token and 1 dodge token.",
  Ram: "During the Modify Attack Dice step, you may change X attack die results to crit results if you performed at least 1 full standard move at max speed during the same activation as this attack.",
  Ready: "After you perform a standby action, gain X aim tokens.",
  Recharge: "When you recover, flip up to X inactive shield tokens to their active side.",
  Reconfigure:
    "When you recover, you may flip this card. Reconfigure does not exhaust this card.",
  Regenerate:
    "At the end of your activation, roll 1 white defense die for each wound token you have, up to X. For each defense surge or block result, remove 1 wound token.",
  Reinforcements: "You may deploy after all units without Reinforcements have deployed.",
  Relentless: "After you perform a move action, you may perform 1 free attack action.",
  Repair:
    "Choose a friendly droid trooper or vehicle unit at range 1 and in LOS. Place 1 wound token on this card to remove up to X wound, ion, or vehicle damage tokens from the chosen unit, or to RESTORE X minis to that unit. You cannot do this action if this card has Y wound tokens. If you have multiple Repairs, treat each as a separate ability.",
  Reposition:
    "Either before or after you perform a standard move, you may perform a free pivot action.",
  Restore:
    "Choose a unit, then select a mini from this unit defeated in the current round. Place that mini in cohesion with its unit leader, then give it wound tokens equal to one less than its wound threshold",
  Retinue:
    "At the start of the Activation Phase, if you are at range 1-2 of X, gain 1 aim or dodge token.",
  Ruthless:
    "When another friendly Corps trooper unit at range 2 and in LOS that has a faceup order token activates, it may suffer 1 wound to perform 1 free action.",
  Scale:
    "When you perform a climb, you may move a vertical distance of up to height 2. Do not reduce maximum speed when moving through difficult terrain.",
  Scatter:
    "After performing an attack against a trooper unit with small bases, you may move any non-leader minis in the defending unit, following the all the rules of cohesion, as if the unit leader had performed a standard move.",
  Scout: "After you deploy, you may perform a speed-X move.",
  "Scouting Party":
    "After you use the Scout keyword, you max choose up to X friendly trooper units at range 1-2 which have not performed a Scout. Each chosen unit may perform a move with speed equal this unit's Scout value.",
  "Secret Mission":
    "Once per game as a free action, if you are within an enemy deployment zone, place 1 victory token on your card. At the end of the game if you are undefeated and have a victory token, gain that token.",
  "Self-Destruct":
    "You may perform this attack as a free action if you have at least X wound tokens. Perform this attack against all unit within range 1 and LOS, even if they are engaged. This attack my not be performed by a unit embarked on a TRANSPORT. After performing all attacks, the unit making this attack is defeated and removed from play.",
  "Self-Preservation":
    "When checking for panic, this unit cannot use the courage value of of units not of the same affiliation.",
  Sentinel: "Your standby range is 1-3.",
  Sharpshooter: "While performing a ranged attack, reduce the defender's cover by X.",
  "Shield Token":
    "While defending against a ranged attack, during the Apply Dodge and Cover step, a unit may flip any number of active shield tokens. For each shield token flipped this way, the defender cancels 1 hit or crit result.",
  Shielded: "You have X shield tokens.",
  Sidearm:
    "While performing an attack, this mini can only use the weapon on this upgrade card if the attack type matches X.",
  Skirmish: "Intended for use in Skirmish matches.",
  Small: "While defending against a non-area ranged attack, ignore this mini.",
  Smoke: "Place X smoke token(s) within range 1 and in LOS of your unit leader.",
  "Soresu Mastery":
    "While defending or using GUARDIAN, if you spend a dodge token, you gain surge to block and the attacker suffers 1 wound for each surge rolled. When using GUARDIAN, you may spend 1 dodge token and reduce your GUARDIAN value by 1 to cancel 1 hit result.",
  "Special Issue": "This unit may only be included in X battleforce",
  Speeder:
    "While moving, ignore terrain that is height X or lower. When at the start or end of your activation, you must perform a free compulsory move.",
  Spotter: "Choose X friendly units at range 1. Each unit gains an aim token.",
  Spray:
    "Add this weapon's dice to the attack pool one time for each mini in the defending unit to which LOS is not blocked.",
  Spur: "While performing a move, you may gain 1 suppression token to increase your maximum speed by 1.",
  Stationary: "You cannot perform moves, except pivots.",
  Steady: "After you perform a move action, you may perform a free ranged attack action.",
  Strategize:
    "Gain 1 suppression token and choose X friendly units at range 1. The chosen units each gain 1 aim and 1 dodge token.",
  Suppressive:
    "After you perform an attack, the defender that this weapon was used against gains 1 suppression token.",
  "Surge Token":
    "Spending one or more surge tokens will convert the same number of surges to blocks while defending or using using GUARDIAN, and to hits while attacking.",
  Tactical: "After you perform a standard move, gain X aim tokens.",
  "Take Cover":
    "Choose X friendly trooper units at range 1. Each unit gains a dodge token.",
  Target: "After you are issued an order, gain X aim tokens.",
  Teamwork:
    "While you are at range 1-2 of X, when you or X gains an aim or dodge token, the other unit gains a token of the same type.",
  Tempted: "You can equip force upgrades of any alignment.",
  "Tow Cable":
    "After a vehicle is wounded by an attack that includes this weapon, the attacker performs a pivot with that vehicle.",
  "Transport:  Closed":
    "You may transport up to X friendly trooper units. More info can be found at Legion Quick Guide.",
  "Transport:  Open":
    "You may transport up to X friendly trooper units. Units being transported can spend tokens, ignore restrictions on Fixed keywords when attacking. More info can be found at Legion Quick Guide.",
  Treat:
    "Choose a friendly non-droid trooper unit at range 1 and in LOS and place a wound token on this card. Remove up to X wound or poison tokens from that unit or restore up to X miniatures to that unit. You cannot use this ability if this card has Y or more wound tokens. If you have multiple TREAT keywords, treat them as separate abilities.",
  "Uncanny Luck":
    "While defending, you may reroll up to X defense dice. All dice must be rerolled at once, no die can be rerolled twice.",
  Unconcerned:
    "You cannot benefit from cover, minis in this unit cannot be repaired or restored.",
  Unhindered: "You ignore the effects of difficult terrain.",
  Unstoppable:
    "This unit is eligible to activate while it has one or fewer facedown order tokens. This unit may never have more than one faceup order token. While this unit is not defeated, when creating its order pool, its controlling player adds an additional order token for this unit to the order pool",
  Vehicle:
    "You can:  pivot, block LOS. Ground vehicles can:  reverse, move through repulsor vehicles, perform the standby action, obscure other minis and provide cover. Repulsor vehicles:  can move through troopers and vehicles.",
  Versatile: "You can perform ranged attacks using this weapon while engaged.",
  "Weak Point":
    "While defending, if the attacker's unit leader is inside the listed arc(s), the attack pool gains IMPACT X.",
  "Wheel Mode":
    "At the start of your activation, as a free action, you may increase your maximum speed to 3. If you do, until the end of the round, you gain COVER 2 and cannot attack or flip active shield tokens.",
  Wound: "The first time you enter play, you suffer X wounds.",
};

export default keywords;
