import { Simulation } from '../../../simulation/simulation';
import { Buff } from '../../buff.enum';
import { QualityAction } from '../quality-action';
import { CraftingJob } from '../../crafting-job.enum';
import { SimulationFailCause } from '../../simulation-fail-cause.enum';

export class ByregotsBlessing extends QualityAction {
  getLevelRequirement(): { job: CraftingJob; level: number } {
    return { job: CraftingJob.ANY, level: 50 };
  }

  _canBeUsed(simulationState: Simulation): boolean {
    return (
      simulationState.hasBuff(Buff.INNER_QUIET) &&
      simulationState.getBuff(Buff.INNER_QUIET).stacks > 1
    );
  }

  getFailCause(
    simulationState: Simulation,
    linear?: boolean,
    safeMode?: boolean
  ): SimulationFailCause | undefined {
    const superCause = super.getFailCause(simulationState, linear, safeMode);
    if (!simulationState.success && !superCause && !simulationState.hasBuff(Buff.INNER_QUIET)) {
      return SimulationFailCause.NO_INNER_QUIET;
    }
    return superCause;
  }

  execute(simulation: Simulation): void {
    super.execute(simulation);
    simulation.removeBuff(Buff.INNER_QUIET);
  }

  getBaseCPCost(simulationState: Simulation): number {
    return 24;
  }

  getBaseDurabilityCost(simulationState: Simulation): number {
    return 10;
  }

  getBaseSuccessRate(simulationState: Simulation): number {
    return 100;
  }

  getIds(): number[] {
    return [100339, 100340, 100341, 100342, 100343, 100344, 100345, 100346];
  }

  getPotency(simulation: Simulation): number {
    return 100 + (simulation.getBuff(Buff.INNER_QUIET).stacks - 1) * 20;
  }
}
