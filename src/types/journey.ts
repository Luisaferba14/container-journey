export type EvidenceLabel = 'verified' | 'fictional' | 'assumption' | 'calculation';

export interface EvidenceInfo {
  label: EvidenceLabel;
  claim: string;
  sourceText?: string;
  sourceUrl?: string;
  citationRef?: string;
  note?: string;
}

export type ResponsibilityType = 'physical' | 'legal' | 'information' | 'cost';

export type ContainerStatus =
  | 'Empty'
  | 'Stuffing'
  | 'Sealed'
  | 'At terminal'
  | 'Loaded'
  | 'In transit'
  | 'Held'
  | 'Customs clearance'
  | 'Released'
  | 'Delivered'
  | 'Returned';

export type TransportMode = 'truck' | 'barge' | 'vessel' | 'rail' | 'stationary' | 'warehouse';

export interface Waypoint {
  name: string;
  coordinates: [number, number]; // [lng, lat]
  description?: string;
}

export interface DisruptionEvent {
  id: 'event-1' | 'event-2' | 'event-3';
  title: string;
  trigger: string;
  operationalResponse: string;
  directImpactDays: number;
  impactLabel: string;
  whyItMatters: string;
  interactiveType: 'mismatch' | 'weather' | 'scan';
}

export interface JourneyStage {
  id: string;
  stageNumber: number;
  dayStart: number;
  dayEnd: number;
  plannedDate: string;
  actualDate: string;
  title: string;
  firstPersonVoice: string; // The container's voice
  location: string;
  coordinates: [number, number]; // [lng, lat]
  mapZoom: number;
  mapPitch?: number;
  mapBearing?: number;
  mode: TransportMode;
  status: ContainerStatus;
  currentCustodian: string;
  responsibleLead: string;
  actorIds: string[];
  documentIds: string[];
  evidenceIds: string[];
  disruptionId?: 'event-1' | 'event-2' | 'event-3';
  costToDate: number;
  emissionsRangeKgCO2: [number, number]; // [min, max]
  unlockDependency: string; // "What must become true before it moves again"
  overview: string;
  physicalAction: string;
  infrastructure: string;
  risks: string;
  tags?: string[];
}

export interface Actor {
  id: string;
  name: string;
  role: string;
  organization: string;
  activeWindow: string;
  responsibilities: ResponsibilityType[];
  description: string;
  avatarColor: string;
  isRealEntity: boolean;
}

export interface ShippingDocument {
  id: string;
  name: string;
  shortCode: string;
  createdBy: string;
  contains: string;
  usedBy: string;
  whyItMatters: string;
  stageIds: string[];
  evidenceLabel: EvidenceLabel;
  sampleFields: Record<string, string>;
  mismatchHighlight?: {
    field: string;
    originalValue: string;
    correctedValue: string;
    impact: string;
  };
}

export interface CostItem {
  id: string;
  category: string;
  amount: number;
  percentage: number;
  description: string;
  costBearer: string;
  evidenceLabel: EvidenceLabel;
}

export interface DelayCostFactor {
  title: string;
  rate: string;
  description: string;
  triggerCondition: string;
}

export interface ModeEmissionRate {
  mode: string;
  rangeGramsPerTkm: [number, number];
  roleInStory: string;
  distanceKm: number;
  calculatedKgCO2: [number, number];
}

export interface EvidenceSource {
  id: string;
  refIndex: number;
  claim: string;
  label: EvidenceLabel;
  sourceTitle: string;
  publisher: string;
  url?: string;
  retrievedDate?: string;
  educationalNote: string;
}
