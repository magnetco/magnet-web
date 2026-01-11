---
name: Chess-like Tactical Overhaul
overview: Transform the game into pure tactical combat with pre-built castle walls (gate at back), fixed starting armies positioned around the castle, larger realms for multiple attack angles, and smarter AI coordination.
todos:
  - id: realm-size
    content: Increase REALM_SIZE to 12 in types.ts
    status: completed
  - id: wall-generation
    content: Update createInitialBricks() to generate wall perimeter with gate opening
    status: completed
    dependencies:
      - realm-size
  - id: starting-army
    content: Rewrite createInitialUnits() to place 16 units per player around castle
    status: completed
    dependencies:
      - realm-size
  - id: remove-build
    content: Remove/disable placeBrick, moveBrick, spawnUnit store actions
    status: completed
  - id: wall-combat
    content: Simplify attackBrick - walls always destroyed in 1 hit
    status: completed
  - id: strip-ai-build
    content: Remove trySpawn and tryBuild from AI action loop
    status: completed
  - id: ai-roles
    content: Add unit role system - designate defenders vs attackers
    status: completed
  - id: ai-coordination
    content: Implement escort behavior and coordinated movement
    status: completed
    dependencies:
      - ai-roles
  - id: strip-hud
    content: Remove spawn/build UI from HUD
    status: in_progress
---

# Chess-like Tactical Game Overhaul

Convert from build-and-spawn economy to pure tactical combat with fixed armies and pre-built defenses.

## Game Design Changes

### Realm Layout

- **Larger realms**: Increase from 8x8 to 12x12 (allows flanking, multiple angles)
- **Pre-built walls**: Ring of 1x1 bricks around realm perimeter
- **Gate**: Opening at back (spawn edge) for unit exit
- **No building**: Remove all brick placement during game

### Castle Walls Structure

```javascript
Example Green Realm (12x12):
     Gate (2-tile opening at back)
         ↓↓
    ██░░██████████
    █            █
    █   Units    █
    █  [Castle]  █
    █   Around   █
    █            █
    ██████████████
         ↑↑
    Path to battlefield

█ = Wall brick (1 HP, destroyed in 1 hit)
░ = Gate opening (no wall)
```



### Starting Army (16 units per player)

| Unit | Count | Starting Position |

|------|-------|-------------------|

| Soldier | 8 | Ring around castle (front-facing) |

| Archer | 4 | Behind soldiers, near castle |

| Knight | 2 | Flanking positions |

| Scout | 2 | Near gate, ready to advance |

### Removed Mechanics

- No brick placement action
- No brick moving
- No unit spawning
- Remove build mode UI entirely

### Wall Properties

- All wall bricks: 1x1 size
- Break with any attack (1 hit kill)
- Provide cover bonus while standing

## Files to Modify

### 1. [`src/state/types.ts`](src/state/types.ts)

- Increase `REALM_SIZE` from 8 to 12
- Add wall brick HP property (or just mark as destructible)

### 2. [`src/state/store.ts`](src/state/store.ts)

- `createInitialBricks()`: Generate wall perimeter with gate
- `createInitialUnits()`: Spawn 16 units per player around castle
- Remove/disable `placeBrick`, `moveBrick`, `spawnUnit` actions
- Simplify `attackBrick` - walls always destroy in 1 hit

### 3. [`src/game/AI.ts`](src/game/AI.ts)

- Remove `trySpawn` and `tryBuild` from action loop
- Add unit role assignment (attackers vs defenders)
- Implement escort behavior (scouts + combat units move together)
- Add wall-breaking tactics (attack walls to create new paths)

### 4. [`src/ui/HUD.ts`](src/ui/HUD.ts)

- Remove spawn controls
- Remove build mode button
- Simplify to: Roll Dice, End Turn, unit info only

## AI Strategy Improvements

### Role Assignment

```typescript
// 2-3 units designated as defenders (stay within 5 tiles of castle)
// Remaining units form attack group
// Scouts paired with combat escorts
```



### Attack Coordination

- Combat units advance together toward enemy realm
- Scouts stay close to escorts (max 3 tiles ahead)
- Break enemy walls to create entry points
- Prioritize killing enemy scouts (they capture!)

### Defense

- Keep defenders near castle core
- Intercept enemy scouts immediately
- Don't abandon castle even when winning

## Starting Position Layout

```javascript
        GATE
    ██░░░░██████
    █ S    S   █     S = Scout (near gate)
    █  s  s    █     s = Soldier  
    █ s[  ]s   █     [ ] = Castle Core (4x4)
    █ s[  ]s   █     A = Archer
    █  A  A    █     K = Knight
    █ K    K   █
    ████████████

```