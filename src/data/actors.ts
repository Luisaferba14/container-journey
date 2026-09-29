import { Actor } from '../types/journey';

export const ACTORS: Actor[] = [
  {
    id: 'actor-mfg',
    name: 'VietStride Manufacturing',
    role: 'Manufacturer',
    organization: 'VietStride Co., Ltd.',
    activeWindow: 'Days -7 to 0',
    responsibilities: ['physical', 'information'],
    description: 'Fabricates, boxes, pallets, counts and secures the 12,000 pairs of running shoes at Bình Dương facility.',
    avatarColor: '#FF6B35',
    isRealEntity: false
  },
  {
    id: 'actor-exp',
    name: 'VietStride Export Division',
    role: 'Exporter / Shipper',
    organization: 'VietStride Co., Ltd.',
    activeWindow: 'Days -7 to 6',
    responsibilities: ['legal', 'information', 'cost'],
    description: 'Commercial seller responsible for contract execution, export compliance, shipping instructions, and certified VGM under SOLAS.',
    avatarColor: '#FF9E6D',
    isRealEntity: false
  },
  {
    id: 'actor-fwd',
    name: 'DeltaBridge Logistics',
    role: 'Freight Forwarder',
    organization: 'DeltaBridge Global Logistics',
    activeWindow: 'Entire journey (Days -7 to 48)',
    responsibilities: ['legal', 'information', 'cost'],
    description: 'Architect and coordinator of the end-to-end multimodal transport under DAP terms; resolves exceptions and rebookings.',
    avatarColor: '#27D3F2',
    isRealEntity: false
  },
  {
    id: 'actor-trk-origin',
    name: 'Saigon Haulage',
    role: 'Origin Trucker',
    organization: 'Saigon Haulage Services',
    activeWindow: 'Days -2 to 1',
    responsibilities: ['physical'],
    description: 'Hauls the empty 40HC container from depot to factory, and transports the stuffed and sealed unit 18 km to Bình Dương ICD.',
    avatarColor: '#F2C66D',
    isRealEntity: false
  },
  {
    id: 'actor-brg',
    name: 'Mekong Link Barge',
    role: 'Inland Barge Operator',
    organization: 'Mekong Link Inland Waterway Co.',
    activeWindow: 'Days 3 to 4',
    responsibilities: ['physical'],
    description: 'Transports the container along 90 km of the Đồng Nai & Thi Vai river network from Bình Dương inland port to Cai Mep.',
    avatarColor: '#45D6A3',
    isRealEntity: false
  },
  {
    id: 'actor-cmit',
    name: 'CMIT Terminal',
    role: 'Origin Deep-Sea Terminal',
    organization: 'Cai Mep International Terminal (APM Terminals JV)',
    activeWindow: 'Days 4 to 6',
    responsibilities: ['physical', 'information'],
    description: 'Receives the barge, verifies OCR/seal, plans yard stacking, checks VGM, and loads container via quay crane onto MV Portalis.',
    avatarColor: '#45D6A3',
    isRealEntity: true
  },
  {
    id: 'actor-customs-vn',
    name: 'Vietnam Customs',
    role: 'Export Customs Authority',
    organization: 'General Department of Vietnam Customs',
    activeWindow: 'Days 2 to 4',
    responsibilities: ['legal'],
    description: 'Reviews electronic export declaration, packing list and origin declarations to grant customs export clearance.',
    avatarColor: '#9E8CFF',
    isRealEntity: true
  },
  {
    id: 'actor-line',
    name: 'Blue Meridian Lines',
    role: 'Ocean Shipping Line',
    organization: 'Blue Meridian Lines Ltd.',
    activeWindow: 'Days -7 to 45',
    responsibilities: ['physical', 'legal', 'information', 'cost'],
    description: 'Carrier providing 40HC container equipment, slot capacity on MV Portalis, ocean carriage contract, and delivery order.',
    avatarColor: '#27D3F2',
    isRealEntity: false
  },
  {
    id: 'actor-crew',
    name: 'MV Portalis Crew & Master',
    role: 'Vessel Operations',
    organization: 'MV Portalis (16,000 TEU cellular containership)',
    activeWindow: 'Days 6 to 43',
    responsibilities: ['physical'],
    description: 'Master and officers maintaining ship stability, cargo lashing, navigation through chokepoints and safe oceanic transit.',
    avatarColor: '#70D7FF',
    isRealEntity: false
  },
  {
    id: 'actor-port-auth',
    name: 'Port Authorities (Vung Tau & GPMM)',
    role: 'Maritime / Port Authorities',
    organization: 'Vung Tau Maritime Admin / Grand Port Maritime de Marseille',
    activeWindow: 'Port transit stages',
    responsibilities: ['legal'],
    description: 'Controls port waters, pilotage allocation, fairway safety, vessel traffic services (VTS), and public dock infrastructure.',
    avatarColor: '#9E8CFF',
    isRealEntity: true
  },
  {
    id: 'actor-eurofos',
    name: 'Eurofos Terminal',
    role: 'Destination Container Terminal',
    organization: 'Eurofos (Marseille-Fos Port 2XL)',
    activeWindow: 'Days 43 to 45',
    responsibilities: ['physical', 'information'],
    description: 'Quay crane discharge from MV Portalis, yard positioning, non-intrusive x-ray scanning presentation, and intermodal rail loading.',
    avatarColor: '#45D6A3',
    isRealEntity: true
  },
  {
    id: 'actor-customs-fr',
    name: 'French Customs (DGDDI)',
    role: 'EU Import Customs Authority',
    organization: 'Direction Générale des Douanes et Droits Indirects',
    activeWindow: 'Days 43 to 44',
    responsibilities: ['legal'],
    description: 'Conducts ICS2 pre-arrival risk analysis, inspects documentation, orders non-intrusive container scan, and issues customs release (BAE).',
    avatarColor: '#9E8CFF',
    isRealEntity: true
  },
  {
    id: 'actor-broker',
    name: 'Rhône Customs Representation',
    role: 'Licensed Customs Broker (RDE)',
    organization: 'Rhône Customs Services SARL',
    activeWindow: 'Days 40 to 44',
    responsibilities: ['legal', 'information'],
    description: 'Registered customs representative filing the electronic Delta-G import declaration and managing the customs scan review.',
    avatarColor: '#C4B5FD',
    isRealEntity: false
  },
  {
    id: 'actor-rail',
    name: 'Rhône Rail Cargo',
    role: 'Intermodal Rail Operator',
    organization: 'Rhône Rail Cargo & Naviland Intermodal',
    activeWindow: 'Days 45 to 46',
    responsibilities: ['physical'],
    description: 'Operates scheduled electric container shuttle from Fos port intermodal terminal to Vénissieux inland terminal (300 km).',
    avatarColor: '#45D6A3',
    isRealEntity: false
  },
  {
    id: 'actor-trk-dest',
    name: 'Alpes Container Transport',
    role: 'Final Delivery Haulier',
    organization: 'Alpes Transport Routier',
    activeWindow: 'Days 46 to 48',
    responsibilities: ['physical'],
    description: 'Picks up container at Vénissieux rail yard, road hauls to warehouse in Saint-Quentin-Fallavier, and returns empty box to depot.',
    avatarColor: '#F2C66D',
    isRealEntity: false
  },
  {
    id: 'actor-whs',
    name: 'RhôneSport DC Warehouse Team',
    role: 'Receiving Warehouse',
    organization: 'RhôneSport Distribution Centre',
    activeWindow: 'Day 47',
    responsibilities: ['physical', 'information'],
    description: 'Verifies bolt seal integrity, cuts seal, unloads 20 pallets, counts 600 cartons, inspects shoe boxes, and endorses POD.',
    avatarColor: '#FF6B35',
    isRealEntity: false
  },
  {
    id: 'actor-imp',
    name: 'RhôneSport France',
    role: 'Importer / Consignee',
    organization: 'RhôneSport SAS (Lyon)',
    activeWindow: 'Days -7 to 48+',
    responsibilities: ['legal', 'information', 'cost'],
    description: 'Buyer of footwear inventory under DAP terms; coordinates commercial clearance and integrates 12,000 pairs into distribution network.',
    avatarColor: '#FF9E6D',
    isRealEntity: false
  }
];
