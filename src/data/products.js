const placeholderImage =
  import.meta.env.BASE_URL + "images/products/product-placeholder.png";

export const products = [
  

  // Official Touch Energy Energy Box 1000
  {
    id: "energy-box-1000",
    name: "Energy Box 1000",
    model: "Energy Box 1000",
    category: "Integrated Lithium Power Backup System",
    series: "Home Pro Series",
    tagline: "Integrated power. Everyday reliability.",

    description:
      "A pure sine wave inverter and a 1.28 kWh LiFePO4 battery in one slim, wall-ready enclosure. Energy Box 1000 keeps lights, fans, Wi-Fi and essential appliances running through outages — with no acid, no topping up and no separate battery trolley.",

    price: 50000,
    image: `${import.meta.env.BASE_URL}images/products/energy-box-1000/box1000_1.png`,
    badge: "HOME PRO SERIES",

    features: [
      "Pure sine wave output",
      "Integrated 1.28 kWh LiFePO4 battery",
      "120 A Smart BMS with Bluetooth monitoring",
      "Boost & Buck AVR voltage stabilisation",
      "Maintenance-free lithium battery system",
    ],

    specifications: {
      "Inverter": {
        "Inverter capacity": "1100 VA",
        "Rated output power": "900 W",
        "Surge power": "3000 W",
        "Output waveform": "Pure sine wave",
        "Inverter technology": "Low-frequency, toroidal transformer",
        "Voltage stabilisation": "Boost & Buck AVR, 4-mode",
      },

      "Battery": {
        "Battery type": "Lithium",
        "Chemistry": "LiFePO4 (LFP)",
        "Nominal voltage": "12.8 V",
        "Rated capacity": "100 Ah",
        "Nominal energy": "1280 Wh (1.28 kWh)",
        "Cycle life": "= 2500 cycles*",
      },

      "Charging & BMS": {
        "Charging technology": "Intelligent charging system",
        "Charging current": "20 A",
        "Battery management": "120 A Smart BMS",
        "Continuous discharge": "100 A",
        "BMS communication": "Bluetooth monitoring",
      },

      "Protection": {
        "Overcharge protection": "Included",
        "Deep discharge protection": "Included",
        "Short circuit protection": "Included",
        "Overload protection": "Included",
        "Over-temperature protection": "Included",
      },

      "Interface & General": {
        "Display": "LCD + LED indicators",
        "Maintenance": "Maintenance-free",
        "Application": "Home, office & shop",
        "Typical use": "Essential loads & backup power",
        "Brand / Series": "Touch Energy / Home Pro",
      },

      "Warranty": {
        "Battery warranty": "5 years",
        "Inverter warranty": "3 years",
        "Warranty qualification":
          "Subject to the terms of the Touch Energy commercial warranty.",
      },
    },

    applications: [
      "Homes and villas",
      "Shops and showrooms",
      "Small offices",
      "Godowns and warehouses",
      "Clinics and salons",
    ],

    systemArchitecture: [
      "Mains AC input",
      "4-mode AVR — Boost & Buck",
      "1100 VA pure sine wave inverter",
      "Integrated LiFePO4 12.8 V, 100 Ah battery",
      "120 A Smart BMS",
      "20 A charging",
      "Bluetooth monitoring",
      "Loads up to 900 W",
    ],

    backupTimes: [
      {
        load: "100 W",
        example: "LED lights, 2 fans, Wi-Fi router",
        backup: "˜ 9 h 50 min",
      },
      {
        load: "250 W",
        example: "Lights, fans, TV, laptop",
        backup: "˜ 3 h 55 min",
      },
      {
        load: "500 W",
        example: "Lights, fans, TV, small refrigerator",
        backup: "˜ 2 h 00 min",
      },
      {
        load: "900 W",
        example: "Full rated load",
        backup: "˜ 1 h 05 min",
      },
    ],

    technicalNotes: [
      "Battery energy is based on nominal battery voltage × rated capacity.",
      "Actual backup time depends on connected load, power factor, battery condition, temperature and operating conditions.",
      "The integrated system is intended to operate within the specified inverter and battery limits.",
      "Cycle life and warranty values are subject to the terms of the Touch Energy commercial warranty.",
      "Backup times are calculated estimates assuming 90% usable battery energy and 85% conversion efficiency at resistive load. They are for guidance only.",
      "Touch Energy reserves the right to change specifications without prior notice.",
    ],

    certifications: [
      "ISO 9001:2015",
      "ISO 14001:2015",
      "CPCB Registered Producer · BWM Rules 2022",
    ],

    manufacturerDetails: {
      company: "Touch Energy Technologies Pvt. Ltd.",
      address:
        "No. 70, Chinna Veerampattinam Rd, Ariyankuppam, Puducherry 605 007, India",
      website: "https://www.touchenergy.in",
      datasheetRevision: "Rev 1.0 · 09/2026",
    },

    datasheet:
      import.meta.env.BASE_URL +
      "documents/Touch_EnergyBox1000_Datasheet_1.pdf",

    manufacturer: "Touch Energy Technologies Pvt. Ltd.",
    warranty: "5 years battery warranty · 3 years inverter warranty",
  },
  // Actual Touch Energy product
  {
    id: "tlf-1208100",
    name: "Touch Energy TLF-1208100",
    model: "TLF-1208100",
    category: "Lithium Battery",
    series: "Home Pro Series",
    tagline: "Built for deep, daily cycling.",

    description:
      "A 1.28 kWh LiFePO4 battery pack built on 3.2 V, 100 Ah prismatic cells in a 4S1P configuration. It features a smart BMS with cell balancing and multi-protocol communication. Designed for home inverters, rooftop solar, and backup power in homes, shops, offices, and godowns.",

    // Official selling price not yet provided
    price: 20000,

    // Replace with the actual product image later
    image: `${import.meta.env.BASE_URL}images/products/tlf-1208100/tlf-1208100-1.png`,
    badge: "HOME PRO SERIES",

    features: [
      "Prismatic LiFePO4 cells",
      "Smart BMS with cell balancing",
      "100 A continuous discharge",
      "50 A rapid charging",
      "CAN, RS485, UART, and Bluetooth",
      "Powder-coated mild steel casing",
    ],

    specifications: {
      "Electrical Performance": {
        "Module configuration": "4S1P",
        "Nominal voltage": "12.8 VDC",
        "Operating voltage range": "11–14.6 VDC",
        "Installed energy": "1.28 kWh",
        "Usable energy": "1.15 kWh at 90% DoD",
        "Rated charge current": "20 A",
        "Rapid charge current": "50 A",
        "Rated discharge current": "100 A",
        "Pulse discharge current": "150 A for 2 seconds",
        "Rated discharge power": "1.28 kW",
      },

      Mechanical: {
        Cell: "Prismatic, 3.2 V – 100 Ah",
        "Housing material": "Mild steel (MS) casing",
        "Dimensions (L × B × H)": "260 × 220 × 210 mm",
        "Dimension tolerance": "±5 mm",
        Weight: "13 kg ±5%",
        Terminal: "C-terminal connector",
        "IP grade": "NA",
      },

      "Operating Temperature": {
        Charging: "0–45 °C",
        Discharging: "0–55 °C",
      },

      "BMS & Communication": {
        Protection: "Deep discharge and over-charge",
        "Short circuit": "Protected",
        "Cell management": "Cell balancing",
        Temperature: "Temperature compensation",
        Communication: "CAN / RS485 / UART / Bluetooth",
      },

      "Cycle Life": {
        "Cycle life": "≥ 2,500 cycles",
        "Test conditions": "90% DoD · 25 ±3 °C · 0.2C / 1C",
      },

      "Storage Conditions": {
        "Up to 1 year": "-20 to 25 °C",
        "Up to 6 months": "25 to 35 °C",
        "Up to 3 months": "35 to 45 °C",
        "Less than 1 week": "45 to 60 °C",
        "Storage note":
          "Store at 50 ±5% SOC, humidity <60 ±25% RH, non-condensing.",
      },
    },

    applications: [
      "Homes and villas",
      "Shops and showrooms",
      "Small offices",
      "Godowns and warehouses",
      "Clinics and salons",
    ],

    safetyNotes: [
      "Use only with a compatible LiFePO4 charger or inverter.",
      "Operate within the specified operating limits.",
      "Specifications and warranty conditions may vary with load profile and operating conditions.",
      "Final product certification and transport compliance depend on the exact production configuration.",
    ],

    datasheet:
      import.meta.env.BASE_URL +
      "documents/Touch_12.8V_100Ah_TLF-1208100_Datasheet_2.pdf",

    manufacturer: "Touch Energy Technologies Pvt. Ltd.",
    warranty: "Refer to the applicable product warranty card.",
  },
  {
    id: "tlf-1208200",
    name: "Touch Energy TLF-1208200",
    model: "TLF-1208200",
    category: "12.8 V LiFePO4 Battery",
    series: "Home Pro Series",
    tagline: "Deep-cycle lithium energy storage",

    description:
      "A 2.56 kWh LiFePO4 battery pack built on 3.2 V, 100 Ah prismatic cells in a 4S2P configuration. It features a smart BMS with cell balancing and multi-protocol communication for home inverters, rooftop solar and power backup.",

    price: 35000,
    image: `${import.meta.env.BASE_URL}images/products/tlf-1208200/tlf-1208200-1.png`,
    badge: "HOME PRO SERIES",

    features: [
      "12.8 V nominal voltage and 200 Ah rated capacity",
      "2.56 kWh nominal energy",
      "Prismatic LiFePO4 cells in a 4S2P configuration",
      "Smart BMS with cell balancing",
      "CAN, RS485, UART and Bluetooth communication",
      "100 A continuous discharge current",
      "150 A pulse discharge current for 2 seconds",
      "50 A rapid charging support",
      "Powder-coated mild-steel casing",
      "≥ 2,500 cycles at 90% DoD",
    ],

    specifications: {
      "Electrical Performance": {
        "Module configuration": "4S2P",
        "Nominal voltage": "12.8 VDC",
        "Operating voltage range": "11–14.6 VDC",
        "Installed energy": "2.56 kWh",
        "Usable energy": "2.30 kWh @ 90% DoD",
        "Rated charge current": "20 A",
        "Rapid charge current": "50 A",
        "Rated discharge current": "100 A",
        "Pulse discharge current": "150 A @ 2 s",
        "Rated discharge power": "1.28 kW",
      },

      "Mechanical": {
        "Cell": "Prismatic, 3.2 V – 100 Ah",
        "Housing material": "MS (mild steel) casing",
        "Dimensions (L × B × H)": "370 × 270 × 200 mm",
        "Dimension tolerance": "±5 mm",
        "Weight": "26 kg ±5%",
        "Terminal": "C-terminal connector",
        "IP grade": "NA",
      },

      "Operating Temperature": {
        "Charging": "0–45 °C",
        "Discharging": "0–55 °C",
      },

      "BMS & Communication": {
        "Protection": "Deep discharge and over-charge",
        "Short circuit": "Protected",
        "Cell management": "Cell balancing",
        "Temperature": "Temperature compensation",
        "Communication": "CAN / RS485 / UART / Bluetooth",
      },

      "Cycle Life": {
        "Cycle life": "≥ 2,500 cycles",
        "Test conditions": "90% DoD · 25 ±3 °C · 0.2C / 1C",
      },

      "Storage Conditions": {
        "Up to 1 year": "−20 to 25 °C",
        "Up to 6 months": "25 to 35 °C",
        "Up to 3 months": "35 to 45 °C",
        "Less than 1 week": "45 to 60 °C",
        "Storage state": "50 ±5% SOC",
        "Humidity": "< 60 ±25% RH, non-condensing",
      },
    },

    applications: [
      "Homes and villas",
      "Shops and showrooms",
      "Small offices",
      "Godowns and warehouses",
      "Clinics and salons",
    ],

    safetyNotes: [
      "Use only with a compatible LiFePO4 charger or inverter and within the specified operating limits.",
      "Final product certification and transport compliance depend on the exact production configuration.",
      "Specifications and warranty conditions may vary with load profile and operating conditions.",
      "Touch Energy reserves the right to change specifications without prior notice.",
    ],

    technicalNotes: [
      "Usable energy is specified at 90% DoD.",
      "Cycle life: ≥ 2,500 cycles under the datasheet test conditions of 90% DoD, 25 ±3 °C and 0.2C / 1C.",
      "Final product certification and transport compliance depend on the exact production configuration.",
      "Specifications and warranty conditions may vary with load profile and operating conditions.",
    ],

    certifications: [
      "ISO 9001:2015",
      "ISO 14001:2015",
      "CPCB Registered Producer · BWM Rules 2022",
    ],

    datasheet:
      import.meta.env.BASE_URL +
      "documents/Touch_12.8V_200Ah_TLF-1208200_Datasheet.pdf",

    manufacturer: "Touch Energy Technologies Pvt. Ltd.",
    warranty: "Refer to the applicable Touch Energy warranty terms.",
  },
  {
    id: "tlf-2408100",
    name: "Touch Energy TLF-2408100",
    model: "TLF-2408100",
    category: "25.6 V LiFePO4 Battery",
    series: "Home Pro Series",
    tagline: "Deep-cycle lithium energy storage",

    description:
      "A 2.56 kWh LiFePO4 battery pack built on 3.2 V, 100 Ah prismatic cells in an 8S1P configuration. It features a smart BMS with cell balancing and multi-protocol communication for home inverters, rooftop solar and power backup.",

    price: 35000,
    image: `${import.meta.env.BASE_URL}images/products/tlf-2408100/tlf-2408100-1.png`,
    badge: "HOME PRO SERIES",

    features: [
      "25.6 V nominal voltage and 100 Ah rated capacity",
      "2.56 kWh nominal energy",
      "Prismatic LiFePO4 cells in an 8S1P configuration",
      "8S 100 A Smart BMS with cell balancing",
      "CAN, RS485, UART and Bluetooth communication",
      "100 A continuous discharge current",
      "150 A pulse discharge current for 2 seconds",
      "50 A rapid charging support",
      "Powder-coated mild-steel casing",
      "≥ 2,500 cycles at 90% DoD",
    ],

    specifications: {
      "Electrical Performance": {
        "Module configuration": "8S1P",
        "Nominal voltage": "25.6 VDC",
        "Operating voltage range": "22–29.2 VDC",
        "Installed energy": "2.56 kWh",
        "Usable energy": "2.30 kWh @ 90% DoD",
        "Rated charge current": "20 A",
        "Rapid charge current": "50 A",
        "Rated discharge current": "100 A",
        "Pulse discharge current": "150 A @ 2 s",
        "Rated discharge power": "2.56 kW",
      },

      "Mechanical": {
        "Cell": "Prismatic, 3.2 V – 100 Ah",
        "Housing material": "MS (mild steel) casing",
        "Dimensions (L × B × H)": "370 × 270 × 200 mm",
        "Dimension tolerance": "±5 mm",
        "Weight": "26 kg ±5%",
        "Terminal": "C-terminal connector",
        "IP grade": "NA",
      },

      "Operating Temperature": {
        "Charging": "0–45 °C",
        "Discharging": "0–55 °C",
      },

      "BMS & Communication": {
        "BMS": "8S 100 A Smart BMS",
        "Protection": "Deep discharge and over-charge",
        "Short circuit": "Protected",
        "Cell management": "Cell balancing",
        "Temperature": "Temperature compensation",
        "Communication": "CAN / RS485 / UART / Bluetooth",
      },

      "Cycle Life": {
        "Cycle life": "≥ 2,500 cycles",
        "Test conditions": "90% DoD · 25 ±3 °C · 0.2C / 1C",
      },

      "Storage Conditions": {
        "Up to 1 year": "−20 to 25 °C",
        "Up to 6 months": "25 to 35 °C",
        "Up to 3 months": "35 to 45 °C",
        "Less than 1 week": "45 to 60 °C",
        "Storage state": "50 ±5% SOC",
        "Humidity": "< 60 ±25% RH, non-condensing",
      },
    },

    applications: [
      "Homes and villas",
      "Shops and showrooms",
      "Small offices",
      "Godowns and warehouses",
      "Clinics and salons",
    ],

    safetyNotes: [
      "Use only with a compatible LiFePO4 charger / inverter and within the specified operating limits.",
      "Final product certification and transport compliance depend on the exact production configuration.",
      "Specifications and warranty conditions may vary with load profile and operating conditions.",
      "Touch Energy reserves the right to change specifications without prior notice.",
    ],

    technicalNotes: [
      "Usable energy is specified at 90% DoD.",
      "Cycle life: ≥ 2,500 cycles under the datasheet test conditions of 90% DoD, 25 ±3 °C and 0.2C / 1C.",
      "Final product certification and transport compliance depend on the exact production configuration.",
      "Specifications and warranty conditions may vary with load profile and operating conditions.",
    ],

    certifications: [
      "ISO 9001:2015",
      "ISO 14001:2015",
      "CPCB Registered Producer · BWM Rules 2022",
    ],

    datasheet:
      import.meta.env.BASE_URL +
      "documents/Touch_24V_100Ah_TLF-2408100_Datasheet.pdf",

    manufacturer: "Touch Energy Technologies Pvt. Ltd.",
    warranty: "Refer to the applicable Touch Energy warranty terms.",
  },
  {
    id: "talis5",
    name: "Touch Energy Talis 5",
    model: "Talis 5",
    category: "51.2 V LiFePO4 Battery",
    series: "Talis Series",
    tagline: "Rack-mount lithium energy storage",

    description:
      "A 5.12 kWh rack-mount lithium iron phosphate battery module with a smart BMS, RS485 / CAN communication and front-access terminals. Designed for solar hybrid and backup systems in homes, shops, offices and small businesses.",

    price: 40000,
    image: `${import.meta.env.BASE_URL}images/products/talis5/talis5-1.png`,
    badge: "TALIS SERIES",

    features: [
      "51.2 V nominal voltage and 100 Ah rated capacity",
      "5.12 kWh nominal energy",
      "16S1P LiFePO4 cell configuration",
      "Smart BMS with cell-level protection",
      "RS485 / CAN communication",
      "100 A maximum charge current",
      "100 A continuous discharge current",
      "≥ 2,500 cycles at 80% DoD",
      "19-inch rack-mount format",
      "Scalable up to 16 modules in parallel (approximately 82 kWh)",
    ],

    specifications: {
      "Electrical": {
        "Nominal voltage": "51.2 V",
        "Rated capacity": "100 Ah (0.5C, 25 °C)",
        "Nominal energy": "5.12 kWh",
        "Chemistry": "Lithium iron phosphate (LiFePO4)",
        "Cell configuration": "3.2 V, 100 Ah · 16S1P",
        "Cycle life": "≥ 2,500 cycles @ 1C, 80% DoD",
        "Monthly self-discharge": "< 3%",
      },

      "Charge & Discharge": {
        "Charge voltage": "54.7 ± 0.2 V",
        "Charge method": "0.2C to 57.6 V, then 58.4 V to 0.02C cut-off",
        "Standard charge current": "20 A",
        "Maximum charge current": "100 A",
        "Continuous discharge current": "100 A",
        "Discharge cut-off voltage": "44 V",
        "Charge efficiency": "100% @ 0.2C",
        "Discharge efficiency": "96–99% @ 1C",
      },

      "Communication & System": {
        "Communication": "RS485 / CAN (Modbus for parallel operation)",
        "Compatible inverters": "Growatt, Deye, GoodWe, Sofar and other 48 V low-voltage inverters",
        "Scalability": "Up to 16 modules in parallel (approximately 82 kWh)",
      },

      "Mechanical": {
        "Enclosure": "Aluminium + GF nylon",
        "Dimensions (D × W × H)": "480 × 482 × 137 mm",
        "Weight": "Approximately 38.5 kg",
        "Installation": "19-inch rack mount",
        "Environment": "Indoor",
      },

      "Environmental": {
        "Operating temperature": "0–55 °C",
        "Relative humidity": "5–95%, non-condensing",
      },

      "Protection": {
        "BMS protections": "Over / under-voltage, over-charge and over-discharge current, charge-current limiting, short circuit and overload",
      },

      "Front Panel": {
        "Power terminals": "Positive / negative DC terminals with insulating covers",
        "DC breaker": "Module isolation breaker",
        "Communication ports": "RS485 / CAN ×3",
        "Status indicators": "RUN, ALARM, SOC LEDs and 4-bar state-of-charge indicator",
        "Reset": "BMS reset / wake-up button",
        "Handles": "Front handles and 19-inch rack-mount ears",
      },
    },

    applications: [
      "Homes and villas",
      "Shops and showrooms",
      "Small offices",
      "Godowns and warehouses",
      "Clinics and salons",
    ],

    safetyNotes: [
      "Use only with a compatible inverter / charger and within the specified operating limits.",
      "Install indoors.",
      "Cycle life is subject to Touch Energy commercial warranty terms and operating conditions.",
      "Touch Energy reserves the right to change specifications without prior notice.",
    ],

    technicalNotes: [
      "Nominal energy = nominal voltage × rated capacity.",
      "Cycle life: ≥ 2,500 cycles at 80% DoD under the stated datasheet conditions.",
      "Up to 16 modules can be connected in parallel, approximately 82 kWh total.",
    ],

    certifications: [
      "ISO 9001:2015",
      "ISO 14001:2015",
      "CPCB Registered Producer · BWM Rules 2022",
      "UN38.3-tested cells",
    ],

    datasheet:
      import.meta.env.BASE_URL +
      "documents/Touch_Talis5_51.2V_100Ah_Datasheet_1.pdf",

    manufacturer: "Touch Energy Technologies Pvt. Ltd.",
    warranty: "Refer to the applicable Touch Energy commercial warranty terms.",
  },
  {
    id: "stack20",
    name: "STACK20",
    model: "STACK20",
    category: "Single-Phase Hybrid ESS",
    series: "STACK Platform",
    tagline: "Integrated energy. Reliable backup.",

    description:
      "A complete, pre-integrated energy storage system combining a 6 kW single-phase hybrid inverter, four 5.12 kWh Talis 5 LiFePO4 battery modules, and DC / PV protection in one lockable cabinet. Designed for solar self-consumption and whole-premises backup in homes and small businesses.",

    price: 60000,
    image: `${import.meta.env.BASE_URL}images/products/stack20/stack20-1.png`,
    badge: "STACK PLATFORM",

    features: [
      "6 kW single-phase hybrid inverter",
      "20.48 kWh nominal LiFePO4 battery energy",
      "Four 51.2 V, 100 Ah Talis 5 battery modules",
      "9.6 kW maximum PV input power",
      "2 MPPT trackers",
      "Hybrid, grid-connected, backup and off-grid operating modes",
      "Individual BMS in every battery module",
      "Wi-Fi, RS485 and CAN communication",
      "Integrated DC / PV protection",
      "Pre-wired, lockable cabinet with front-access battery modules",
    ],

    specifications: {
      "System": {
        "System type": "Single-phase hybrid ESS",
        "Rated inverter output": "6 kW",
        "Battery nominal energy": "20.48 kWh",
        "Battery bank": "51.2 V, 400 Ah",
        "Battery chemistry": "LiFePO4 (LFP)",
        "Architecture": "4 modules in parallel + hybrid inverter",
        "Operating modes": "Self-consumption, grid-tied, backup / off-grid†",
        "Applications": "Residential and small commercial",
      },

      "Hybrid Inverter": {
        "Rated AC input / output power": "6,000 W",
        "Max. AC apparent power": "6,600 VA",
        "Rated AC current": "26.1 A",
        "Max. AC current": "28.7 A",
        "Max. continuous AC pass through": "40 A",
        "Off-grid peak power": "2 × rated, 10 s",
        "AC nominal voltage / frequency": "230 V / 50 Hz",
        "THDi": "< 3% of nominal power",
        "Battery voltage range": "40–60 V",
        "Max. charge / discharge current": "100 A",
        "Max. PV input power": "9,600 W",
        "Max. PV access power": "12,000 W",
        "Max. PV input voltage": "500 V",
        "MPPT voltage range": "150–425 V",
        "MPPT trackers / strings": "2 / 1 + 1",
        "Max. PV operating current": "30 A / 28.7 A",
        "Max. efficiency": "97.6%",
        "MPPT efficiency": "> 99%",
        "Communication": "Wi-Fi, RS485, CAN",
        "Display": "LCD",
        "Ingress protection": "IP65",
        "Operating temperature": "−40 to +60 °C (derating > 45 °C)",
        "Cooling": "Natural convection",
      },

      "Battery – Talis 5 Modules": {
        "Module": "Talis 5 · 51.2 V / 100 Ah / 5.12 kWh",
        "Cell configuration": "3.2 V 100 Ah LFP · 16S1P per module",
        "Number of modules": "4, in parallel",
        "System capacity": "400 Ah @ 51.2 V",
        "System nominal energy": "20.48 kWh",
        "Usable energy": "Approximately 16.4 kWh @ 80% DoD",
        "Charge cut-off voltage": "58.4 V per module",
        "Discharge cut-off voltage": "44 V per module",
        "Max. charge current": "Up to 100 A per module (settable)",
        "Continuous discharge current": "Up to 100 A per module (settable)",
        "Cycle life": "≥ 2,500 cycles @ 80% DoD*",
        "Communication": "CAN, RS485 / Modbus",
        "Module dimensions": "480 × 482 × 137 mm",
        "Module weight": "Approximately 38.5 kg",
        "Installation": "Rack-mounted inside cabinet",
      },

      "Protection": {
        "Battery (BMS)": "Over / under-voltage, overcharge and over-discharge current, charge-current limiting, short circuit, overload",
        "Inverter": "DC reverse polarity, AC overcurrent, AC over-voltage, over-temperature, short circuit, DC component monitoring, anti-islanding, residual-current detection†",
      },

      "Communication": {
        "Battery": "CAN / RS485 (Modbus)",
        "Inverter": "Wi-Fi / RS485 / CAN",
      },

      "Mechanical": {
        "Cabinet dimensions (L × B × H)": "1050 × 650 × 900 mm",
        "Battery modules": "4 × 480 × 482 × 137 mm",
        "Battery weight": "Approximately 154 kg (4 × 38.5 kg)",
        "Battery access": "Front access, rack-mounted",
        "Inverter ingress rating": "IP65",
        "Cabinet ventilation": "Side louvres and fans for cabinet air circulation",
      },
    },

    applications: [
      "Homes and villas",
      "Shops and showrooms",
      "Small offices",
      "Godowns and warehouses",
      "Clinics and salons",
    ],

    safetyNotes: [
      "Install indoors or in a sheltered location; battery modules are rated for indoor use.",
      "Off-grid, anti-islanding and residual-current functions depend on inverter configuration and local grid approval.",
      "Battery-side power is limited by the inverter's 100 A battery current (approximately 5.1 kW at 51.2 V nominal); PV can supply the balance of the 6 kW output.",
      "Cycle life is per Talis 5 module specification at 80% DoD and is subject to Touch Energy commercial warranty terms.",
      "Touch Energy reserves the right to change specifications without prior notice.",
    ],

    technicalNotes: [
      "Nominal energy = nominal voltage × rated capacity.",
      "Usable energy is shown at 80% DoD.",
      "Battery-side power is limited by the inverter's 100 A battery current (approximately 5.1 kW at 51.2 V nominal); PV can supply the balance of the 6 kW output.",
      "* Cycle life per Talis 5 module specification at 80% DoD; subject to the Touch Energy commercial warranty terms.",
      "† Off-grid, anti-islanding and residual-current functions depend on inverter configuration and local grid approval.",
      "Install indoors or in a sheltered location; battery modules are rated for indoor use.",
      "Touch Energy reserves the right to change specifications without prior notice.",
    ],

    certifications: [
      "ISO 9001:2015",
      "ISO 14001:2015",
      "CPCB Registered Producer · BWM Rules 2022",
    ],

    datasheet:
      import.meta.env.BASE_URL +
      "documents/Touch_STACK20_6kW_20kWh_Datasheet_3.pdf",

    manufacturer: "Touch Energy Technologies Pvt. Ltd.",
    warranty: "Refer to the applicable Touch Energy commercial warranty terms.",
  },
  {
    id: "talis7",
    name: "Touch Energy Talis 7",
    model: "Talis 7",
    category: "73.6 V LiFePO4 Battery",
    series: "Talis Series",
    tagline: "High-voltage rack-mount energy storage",

    description:
      "A 7.36 kWh rack-mount lithium iron phosphate battery module with a smart BMS, RS485 / CAN communication and front-access terminals. Designed for compatible solar hybrid and backup systems in homes and small businesses.",

    price: 50000,
    image: `${import.meta.env.BASE_URL}images/products/talis7/talis7-1.png`,
    badge: "TALIS SERIES",

    features: [
      "73.6 V nominal voltage and 100 Ah rated capacity",
      "7.36 kWh nominal energy",
      "23S1P LiFePO4 cell configuration",
      "Smart BMS with cell protection",
      "RS485 / CAN communication",
      "100 A maximum charge current",
      "100 A continuous discharge current",
      "19-inch rack-mount installation",
      "Designed for compatible 63–84 V battery-input inverters",
      "Single-module configuration; parallel operation is not supported",
    ],

    specifications: {
      Electrical: {
        "Nominal voltage": "73.6 V",
        "Rated capacity": "100 Ah (0.5C, 25 °C)",
        "Nominal energy": "7.36 kWh",
        Chemistry: "Lithium iron phosphate (LiFePO4)",
        "Cell and configuration": "3.2 V, 100 Ah · 23S1P",
        "Cycle life": "≥ 2,500 cycles at 1C, 80% DoD",
        "Monthly self-discharge": "< 3%",
      },

      "Charge & Discharge": {
        "Charge voltage": "78.2 ± 0.2 V",
        "Standard charge current": "20 A",
        "Maximum charge current": "100 A",
        "Continuous discharge current": "100 A",
        "Discharge cut-off voltage": "63 V",
        "Charge efficiency": "100% at 0.2C",
        "Discharge efficiency": "96–99% at 1C",
      },

      "Communication & System": {
        Communication: "RS485 / CAN",
        "Compatible inverters":
          "Inverters with a 63–84 V battery input; confirm compatibility with Touch Energy",
        Configuration: "Single module; parallel operation not supported",
      },

      Mechanical: {
        Enclosure: "Aluminium + GF nylon",
        "Dimensions (D × W × H)": "650 × 482 × 137 mm",
        Weight: "Approximately 55 kg",
        Installation: "19-inch rack mount",
        Environment: "Indoor",
      },

      Environmental: {
        "Operating temperature": "0–55 °C",
        "Relative humidity": "5–95%, non-condensing",
      },

      Protection: {
        "BMS protections":
          "Over/under-voltage, over-charge and over-discharge current, charge-current limiting, short circuit and overload",
      },
    },

    applications: [
      "Homes and villas",
      "Shops and showrooms",
      "Small offices",
      "Godowns and warehouses",
      "Clinics and salons",
    ],

    safetyNotes: [
      "Use only with a compatible inverter or charger.",
      "Confirm inverter compatibility with Touch Energy before installation.",
      "Install indoors and operate within the specified limits.",
      "Parallel operation is not supported for this module.",
      "Cycle life is subject to applicable warranty terms and operating conditions.",
    ],

    certifications: [
      "ISO 9001:2015",
      "ISO 14001:2015",
      "CPCB Registered Producer · BWM Rules 2022",
    ],

    datasheet:
      import.meta.env.BASE_URL +
      "documents/Touch_Talis7_73.6V_100Ah_Datasheet_2.pdf",

    manufacturer: "Touch Energy Technologies Pvt. Ltd.",
    warranty: "Refer to the applicable Touch Energy commercial warranty terms.",
  },
];

export default products;






