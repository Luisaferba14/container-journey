import { ModeEmissionRate } from '../types/journey';

export const MODE_EMISSION_RATES: ModeEmissionRate[] = [
  {
    mode: 'Ocean Deep-Sea (Container Vessel)',
    rangeGramsPerTkm: [2, 7],
    roleInStory: 'Main trunk leg: Cai Mep to Fos-sur-Mer',
    distanceKm: 15450,
    calculatedKgCO2: [370.8, 1297.8]
  },
  {
    mode: 'Inland Waterway (Container Barge)',
    rangeGramsPerTkm: [30, 49],
    roleInStory: 'Bình Dương ICD to CMIT deep-sea terminal',
    distanceKm: 90,
    calculatedKgCO2: [32.4, 52.9]
  },
  {
    mode: 'Electric Intermodal Rail',
    rangeGramsPerTkm: [18, 35],
    roleInStory: 'Fos intermodal terminal to Vénissieux',
    distanceKm: 300,
    calculatedKgCO2: [64.8, 126.0]
  },
  {
    mode: 'Heavy Goods Vehicle (Road Trucking)',
    rangeGramsPerTkm: [62, 110],
    roleInStory: 'First & last mile road hauls (55 km total)',
    distanceKm: 55,
    calculatedKgCO2: [40.9, 72.6]
  },
  {
    mode: 'Dedicated Air Freight (Counterfactual)',
    rangeGramsPerTkm: [665, 1200],
    roleInStory: 'Hypothetical air corridor (Ho Chi Minh to Lyon)',
    distanceKm: 15000,
    calculatedKgCO2: [119700.0, 216000.0]
  }
];

export const TOTAL_EMISSIONS_MULTIMODAL: [number, number] = [508.9, 1549.3]; // kg CO2 (~0.51 to 1.55 tCO2e)

export const ROAD_REPLACEMENT_EMISSIONS: [number, number] = [223.2, 396.0]; // 300 km road instead of rail

export const SUSTAINABILITY_POLICY_NOTES = {
  imoTarget2030: 'At least 40% reduction in average carbon intensity of international shipping by 2030 (vs 2008 base).',
  imoTarget2050: 'Net-zero greenhouse gas emissions from international shipping by or around 2050, with interim checkpoints in 2030 (-20% to -30%) and 2040 (-70% to -80%).',
  methodologyCaveat: 'Indicative operational CO2 intensity ranges based on European Environment Agency (EEA) TERM benchmarks. These figures are educational sensitivity estimations and are not directly interchangeable with an audited corporate GHG Protocol or ISO 14083 carbon footprint.'
};
