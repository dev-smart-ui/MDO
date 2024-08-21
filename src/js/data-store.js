export let store = {
    targetSegments: [
        {
            name: 'Mining',
            defaultSelected: 'Mining Operations',
            services: ['Research Package', 'Mining Operations', 'Key Mine Personnel', 'Mining Contracts', 'Project Timeline',]
        },
        {
            name: 'Backfilling',
            defaultSelected: 'Mining Operations',
            services: ['Research Package', 'Mining Operations', 'Key Mine Personnel', 'Mining Contracts', 'Project Timeline']
        },
        {
            name: 'Comminution',
            defaultSelected: 'Comminution',
            services: ['Research Package', 'Comminution', 'Key Mine Personnel', 'Project Timeline']
        },
        {
            name: 'Mineral Processing',
            defaultSelected: 'Mineral Processing',
            services: ['Research Package', 'Mineral Processing', 'Key Mine Personnel', 'Project Timeline']
        },
        {
            name: 'Mobile Equipment',
            defaultSelected: 'Heavy Mobile Equipment',
            services: ['Research Package', 'Heavy Mobile Equipment', 'Key Mine Personnel', 'Project Timeline']
        },
        {
            name: 'Conveyors',
            defaultSelected: 'Conveyors',
            services: ['Research Package', 'Conveyors', 'Key Mine Personnel', 'Project Timeline']
        },
        {
            name: 'Pumps & Pipelines',
            defaultSelected: 'Pumps, Pipelines and Water Supply',
            services: ['Research Package', 'Pumps, Pipelines and Water Supply', 'Key Mine Personnel', 'Project Timeline']
        },
        {
            name: 'Camp Services',
            defaultSelected: 'Remote Mining Camps',
            services: ['Research Package', 'Remote Mining Camps', 'Key Mine Personnel', 'Mapper & Coordinates',]
        },
        {
            name: 'Business Development & Investment',
            defaultSelected: 'Project Costs & Returns',
            services: ['Research Package', 'Project Costs & Returns', 'Production Costs', 'Key Mine Personnel',]
        },
    ],

    allServices: [
        {
            name: 'Research Package',
            iconImg: './src/images/icons/modules/research.svg',
            img: '.././src/images/presentation/slides/key-mine-personnel-and-workforce.jpeg',
            price: 2000.00,
            video:"https://www.youtube.com/embed/8VESowgMbjA?si=qJbm3YA6jJnztTLo",
            serviceTabs: [
                {
                    title: "Geographic Location, Address & Phone Number",
                    info: `<ul class="dropdown-menu">
                            <li class="dropdown-item">Country</li>
                            <li class="dropdown-item">Landmark (city or town)</li>
                            <li class="dropdown-item">Distance from landmark (e.g. 60 km NE from Perth, WA, Australia)</li>
                            <li class="dropdown-item">Mine office address </li>
                            <li class="dropdown-item">Mine office phone number</li>
                            <li class="dropdown-item">Web site URL</li>
                            <li class="dropdown-item">Email address</li>
                        </ul>`
                },
                {
                    title: "Ownership ",
                    info: `<ul class="dropdown-menu">
                            <li class="dropdown-item">Type - direct or indirect (via subsidiary or JV)</li>
                            <li class="dropdown-item">Interest (percentage)</li>
                        </ul>`
                },
                {
                    title: "Development Stage",
                    info: `<ul class="dropdown-menu">
                            <li class="dropdown-item">Preliminary Economic Assessment (PEA)</li>
                            <li class="dropdown-item">Pre-feasibility (PFS)</li>
                            <li class="dropdown-item">Feasibility (FS)</li>
                            <li class="dropdown-item">Permitting</li>
                            <li class="dropdown-item">Construction and Restarting</li>
                            <li class="dropdown-item">Production</li>
                        </ul>`
                },
                {
                    title: "Mine Type",
                    info: `<ul class="dropdown-menu">
                            <li class="dropdown-item">In-Situ</li>
                            <li class="dropdown-item">Surface (stockpile, tailings)</li>
                            <li class="dropdown-item">Open Pit / Open Cast</li>
                            <li class="dropdown-item">Open Pit and Underground (combined)</li>
                            <li class="dropdown-item">Underground</li>
                        </ul>`
                },
                {
                    title: "Commodities",
                    info: `<ul class="dropdown-menu">
                            <li class="dropdown-item">Critical minerals (lithium, cobalt, graphite, REE)</li>
                            <li class="dropdown-item">Precious metals (gold, silver, PGM)</li>
                            <li class="dropdown-item">Base metals (copper, zinc, lead,  aluminum)</li>
                            <li class="dropdown-item">Minor metals (bismuth, molybdenum, titanium)</li>
                            <li class="dropdown-item">Stgeel raw materials (iron, chrome, vanadium)</li>
                            <li class="dropdown-item">Energy minerals (coal, uranium)</li>
                            <li class="dropdown-item">Industrial minerals (silica, potash, phosphate, trona)</li>
                            <li class="dropdown-item">Gems (diamond, emerald, ruby)</li>
                        </ul>`
                },
                {
                    title: "Deposit Type & Geology",
                    info: `<ul class="dropdown-menu">
                            <li class="dropdown-item">Sedimentary deposits</li>
                            <li class="dropdown-item">Metamorphic deposits</li>
                            <li class="dropdown-item">Magmatic deposits</li>
                            <li class="dropdown-item">Hydrothermal deposits</li>
                            <li class="dropdown-item">VMS, SEDEX, IOCG and more</li>
                            <li class="dropdown-item">Deposit dimentions</li>
                            <li class="dropdown-item">Deposit mineralogy</li>
                        </ul>`
                },
                {
                    title: "Reserves, Resources & Life of Mine",
                    info: `<ul class="dropdown-menu">
                            <li class="dropdown-item">Proven, Probable, Measured, Indicated, Inferred</li>
                            <li class="dropdown-item">Cut-off Grade</li>
                            <li class="dropdown-item">Tonnage, Average Grade, Contained metal</li>
                            <li class="dropdown-item">Life of Mine, years</li>
                        </ul>`
                },
                {
                    title: "Commodity Production",
                    info: `<ul class="dropdown-menu">
                            <li class="dropdown-item">Forecast</li>
                            <li class="dropdown-item">Current</li>
                            <li class="dropdown-item">Historic</li>
                            <li class="dropdown-item">Production start year</li>
                        </ul>`
                },
                {
                    title: "Workforce",
                    info: `<ul class="dropdown-menu">
                            <li class="dropdown-item">Employees</li>
                            <li class="dropdown-item">Contracors</li>
                            <li class="dropdown-item">Total Workforce</li>
                        </ul>`
                },
                {
                    title: "Mine Financials",
                    info: `<ul class="dropdown-menu">
                            <li class="dropdown-item">Revenue</li>
                            <li class="dropdown-item">EBITDA</li>
                            <li class="dropdown-item">Income</li>
                        </ul>`
                },
            ],
            overviewDescription: 'Exceptional value for your dollar! Perfect for mining industry research. Covers over 2400 mines and advanced projects located in 100 countries.',
        },
        {
            name: 'Heavy Mobile Equipment',
            iconImg: './src/images/icons/modules/mobile-equipment.svg',
            img: '.././src/images/presentation/slides/heavy-mobile-equipment.jpeg',
            price: 100.00,
            video:"https://www.youtube.com/embed/1hs4FDhCpfs?si=nryLAk-8HWsfy_-c",
            serviceTabs: [
                {
                    title: "50 Mobile Equipment Types",
                    info: `<ul  class="dropdown-menu">
                            <li class="dropdown-item">Controller Type (Autonomous or Driver operated)</li>
                            <li class="dropdown-item">Fuel Type (Diesel, Electric)</li>
                            <li class="dropdown-item">Open Pit Equipment (Loaders, Trucks, Shovels, Dozers, Drills)</li>
                            <li class="dropdown-item">Underground Equipment (LHD, Jumbo, Bolter, Continuous miner)</li>
                            <li class="dropdown-item">Search by Equipment Type</li>
                        </ul>`
                },
                {
                    title: "2,000 Mobile Equipment Models",
                    info: `<ul  class="dropdown-menu">
                            <li class="dropdown-menu-list">
                                  Manufactued by:
                                <ul>
                                        <li>Caterpillar</li>
                                        <li>Komatsu</li>
                                        <li>Liebherr</li>
                                        <li>Hitachi</li>
                                        <li>Epiroc</li>
                                        <li>Sandvik</li>
                                </ul>
                            </li>
                        </ul>`
                },
            ],
            overviewDescription: 'Covers both open pit and underground mining equipment at 900 active mine sites and required equipment at 500 projects; over 62,000 units.',
        },
        {
            name: 'Mining Operations',
            iconImg: './src/images/icons/modules/mining-operations.svg',
            img: '.././src/images/presentation/slides/heavy-mobile-equipment.jpeg',
            price: 100.00,
            video:"https://www.youtube.com/embed/8VESowgMbjA?si=qJbm3YA6jJnztTLo",
            serviceTabs: [
                {
                    title: "100 Mining Methods and Technologies",
                    info: `<ul  class="dropdown-menu">
                            <li class="dropdown-item">Block caving</li>
                            <li class="dropdown-item">Vertical block mining</li>
                            <li class="dropdown-item">Cut & Fill</li>
                            <li class="dropdown-item">Panel mining</li>
                            <li class="dropdown-item">Highwall mining</li>
                            <li class="dropdown-item">Get detailed description of mine design</li>
                            <li class="dropdown-item">Search mines by Mining Method</li>
                        </ul>`
                },
                {
                    title: "Mining Scale",
                    info: `<ul  class="dropdown-menu">
                            <li class="dropdown-item">Key parameter for identifying largest mines</li>
                            <li class="dropdown-item">Helps estimating required mobile equipment </li>
                        </ul>`
                },
                {
                    title: "Mill Throughput Capacity",
                    info: `<ul  class="dropdown-menu">
                            <li class="dropdown-item">Key parameter for identifying largest plants</li>
                            <li class="dropdown-item">Helps estimating required grinding media</li>
                        </ul>`
                },
                {
                    title: "Backfill Type",
                    info: `<ul  class="dropdown-menu">
                            <li class="dropdown-item">Cemented paste backfill</li>
                            <li class="dropdown-item">Cemented rockfill</li>
                            <li class="dropdown-item">Cemented hydraulic fill</li>
                        </ul>`
                },
                {
                    title: "Hoist Shaft Depth",
                    info: `<ul  class="dropdown-menu">
                            <li class="dropdown-item">Helps estimating hoisting equipment</li>
                            <li class="dropdown-item">Helps estimating ventilation requirements</li>
                        </ul>`
                },
            ],
            overviewDescription: 'Comprehensive coverage of operations at mine sites',
        },
        {
            name: 'Comminution',
            iconImg: './src/images/icons/modules/mining-operations.svg',
            img: '.././src/images/presentation/slides/commodity-production.jpeg',
            price: 100.00,
            video:"https://www.youtube.com/embed/8VESowgMbjA?si=qJbm3YA6jJnztTLo",
            serviceTabs: [
                {
                    title: "30 Crusher and Mill Types",
                    info: `<ul  class="dropdown-menu">
                            <li class="dropdown-item">Jaw crusher</li>
                            <li class="dropdown-item">Cone crusher</li>
                            <li class="dropdown-item">Gyratory crusher</li>
                            <li class="dropdown-item">Impact crusher</li>
                            <li class="dropdown-item">AG mill</li>
                            <li class="dropdown-item">SAG mill</li>
                            <li class="dropdown-item">Ball mill</li>
                            <li class="dropdown-item">Rod mill</li>
                            <li class="dropdown-item">UFG mill</li>
                            <li class="dropdown-item">HPGR mill</li>
                        </ul>`
                },
                {
                    title: "200 Crusher and Mill Models",
                    info: `<ul  class="dropdown-menu">
                            <li class="dropdown-menu-list">
                            Manufactued by:
                                <ul>
                                        <li>FLSmidth</li>
                                        <li>IsaMill</li>
                                        <li>Metso</li>
                                        <li>MMD</li>
                                        <li>Sandvik</li>
                                        <li>Terex</li>
                                        <li>ThyssenKrupp</li>
                                        <li>Weir</li>
                                </ul>
                                </li>
                            
                        </ul>`
                },
                {
                    title: "Comminution process details",
                    info: null
                },
                {
                    title: "Flowsheet diagrams",
                    info: null
                },
            ],
            overviewDescription: '1,200 mines and projects with crushers, mills and comminution information',
        },
        {
            name: 'Mineral Processing',
            iconImg: './src/images/icons/modules/mineral-processing.svg',
            img: '.././src/images/presentation/slides/mineral-processing.jpeg',
            price: 100.00,
            video:"https://www.youtube.com/embed/8VESowgMbjA?si=qJbm3YA6jJnztTLo",
            serviceTabs: [
                {
                    title: "120 Processing Technologies and Recovery Methods",
                    info: `<ul  class="dropdown-menu">
                            <li class="dropdown-item">ADR</li>
                            <li class="dropdown-item">Bacterial oxidation</li>
                            <li class="dropdown-item">Flotation</li>
                            <li class="dropdown-item">Leaching (heap and concentrate)</li>
                            <li class="dropdown-item">Ore sorting</li>
                            <li class="dropdown-item">Purification</li>
                            <li class="dropdown-item">Pyrometallurgy</li>
                            <li class="dropdown-item">Solvent Extraction</li>
                            <li class="dropdown-item">Electrowinning</li>
                        </ul>`
                },
                {
                    title: "Reagents",
                    info: `<ul  class="dropdown-menu">
                            <li class="dropdown-item">Cyanide </li>
                            <li class="dropdown-item">Hydrochloric acid</li>
                            <li class="dropdown-item">Sodium carbonate</li>
                            <li class="dropdown-item">Sulfuric acid</li>
                            <li class="dropdown-item">Thiosulfate</li>
                        </ul>`
                },
                {
                    title: "Mineral processing details",
                    info: null
                },
                {
                    title: "Flowsheet diagrams",
                    info: null
                },

            ],
            overviewDescription: 'Comprehensive coverage of ore processing at mine sites',
        },
        {
            name: 'Key Mine Personnel',
            iconImg: './src/images/icons/modules/key-managers.svg',
            img: '.././src/images/presentation/slides/commodity-production.jpeg',
            price: 100.00,
            video:"https://www.youtube.com/embed/8VESowgMbjA?si=qJbm3YA6jJnztTLo",
            serviceTabs: [
                {
                    title: "20 Main Job Categoris",
                    info: `<ul  class="dropdown-menu">
                            <li class="dropdown-item">General Managers</li>
                            <li class="dropdown-item">Operation Managers</li>
                            <li class="dropdown-item">Mine Managers</li>
                            <li class="dropdown-item">Maintenance Managers</li>
                            <li class="dropdown-item">Mine Planners</li>
                            <li class="dropdown-item">Mill / Plant Managers</li>
                            <li class="dropdown-item">Processing / Metallurgy Managers</li>
                            <li class="dropdown-item">Engineering Managers</li>
                            <li class="dropdown-item">Drilling & Blasting Managers</li>
                            <li class="dropdown-item">Procurement personnel</li>
                            <li class="dropdown-item">Consultants</li>
                        </ul>`
                },
                {
                    title: "200 Consulting Firms",
                    info: `<ul  class="dropdown-menu">
                            <li class="dropdown-item">AMC Consultants</li>
                            <li class="dropdown-item">Ausenco</li>
                            <li class="dropdown-item">Canadian Engineering Associates</li>
                            <li class="dropdown-item">DRA Global</li>
                            <li class="dropdown-item">GR Engineering Services</li>
                            <li class="dropdown-item">Hatch</li>
                            <li class="dropdown-item">Lycopodium</li>
                            <li class="dropdown-item">Mining Plus</li>
                            <li class="dropdown-item">SGS Canada</li>
                            <li class="dropdown-item">Snowden</li>
                            <li class="dropdown-item">Tetra Tech</li>
                        </ul>`
                },
            ],
            overviewDescription: '8,000 key decision makers and consultants',

        },
        {
            name: 'Conveyors',
            iconImg: './src/images/icons/modules/mobile-equipment.svg',
            img: '.././src/images/presentation/slides/conveyors-and-pipelines.jpeg',
            price: 100.00,
            video:"https://www.youtube.com/embed/8VESowgMbjA?si=qJbm3YA6jJnztTLo",
            serviceTabs: [
                {
                    title: "Conveyor Types",
                    info: `<ul  class="dropdown-menu">
                            <li class="dropdown-item">Overland conveyors</li>
                            <li class="dropdown-item">Underground conveyors</li>
                            <li class="dropdown-item">Stacking and sacrificial conveyours</li>
                            <li class="dropdown-item">Pipe conveyors</li>
                            <li class="dropdown-item">Aerial rope conveyors</li>
                        </ul>`
                },
                {
                    title: "Techical specifications",
                    info: `<ul  class="dropdown-menu">
                            <li class="dropdown-item">Length is available for all conveyors</li>
                            <li class="dropdown-item">Conveyor specs reported for some assets:</li>
                            <li class="dropdown-item">Capacity</li>
                            <li class="dropdown-item">Belt speed</li>
                            <li class="dropdown-item">Best width</li>
                            <li class="dropdown-item">Motor size</li>
                        </ul>`
                },
            ],
            overviewDescription: '450 mines and projects with conveyor data',
        },
        {
            name: 'Pumps, Pipelines and Water Supply',
            iconImg: './src/images/icons/modules/key-managers.svg',
            img: '.././src/images/presentation/slides/water-supply-and-consumption.jpeg',
            price: 100.00,
            video:"https://www.youtube.com/embed/8VESowgMbjA?si=qJbm3YA6jJnztTLo",
            serviceTabs: [
                {
                    title: "Pipeline Types",
                    info: `<ul  class="dropdown-menu">
                            <li class="dropdown-item">Slurry </li>
                            <li class="dropdown-item">Tailings</li>
                            <li class="dropdown-item">Solutions</li>
                            <li class="dropdown-item">Clay</li>
                            <li class="dropdown-item">Water</li>
                        </ul>`
                },
                {
                    title: "Pipeline Techical Specifications",
                    info: `<ul  class="dropdown-menu">
                            <li class="dropdown-item">Material</li>
                            <li class="dropdown-item">Diameter</li>
                            <li class="dropdown-item">Length</li>
                        </ul>`
                },
                {
                    title: "Water Supply System",
                    info: `<ul  class="dropdown-menu">
                            <li class="dropdown-item">Water sources</li>
                            <li class="dropdown-item">Consumption rate</li>
                            <li class="dropdown-item">Water system description, including pumps</li>
                        </ul>`
                },

            ],
            overviewDescription: '300 mines and projects with pipelines data',
        },
        {
            name: 'Project Timeline',
            iconImg: './src/images/icons/modules/key-managers.svg',
            img: '.././src/images/presentation/slides/project-development-timeline.jpeg',
            price: 100.00,
            video:"https://www.youtube.com/embed/8VESowgMbjA?si=qJbm3YA6jJnztTLo",
            serviceTabs: [
                {
                    title: "Development Stage",
                    info: null
                },
                {
                    title: "Construction Start",
                    info: null
                },
                {
                    title: "Production Start",
                    info: null
                },
            ],
            overviewDescription: '200 projects with announced development timeline',

        },
        {
            name: 'Mapper & Coordinates',
            iconImg: './src/images/icons/modules/mapper.svg',
            img: '.././src/images/presentation/slides/mining-operations.jpeg',
            price: 100.00,
            video:"https://www.youtube.com/embed/8VESowgMbjA?si=qJbm3YA6jJnztTLo",
            serviceTabs: [
                {
                    title: "Mapping platform",
                    info: `<ul  class="dropdown-menu">
                            <li class="dropdown-item">Plot search results on Google Map</li>
                            <li class="dropdown-item">Toggle between "Map", "Terrain" and "Satellite"</li>
                            <li class="dropdown-item">Measure distance to infrastructure</li>
                        </ul>`
                },
                {
                    title: "Download Coordinates",
                    info: null
                },

            ],
            overviewDescription: 'Spatial tool designed to support research and business development objectives',
        },
        {
            name: 'Mining Contracts',
            iconImg: './src/images/icons/modules/mining-contracts.svg',
            img: '.././src/images/presentation/slides/mining-operations.jpeg',
            price: 100.00,
            video:"https://www.youtube.com/embed/8VESowgMbjA?si=qJbm3YA6jJnztTLo",
            serviceTabs: [
                {
                    title: "Contract Types",
                    info: `<ul  class="dropdown-menu">
                            <li class="dropdown-item">FEED / EPC / EPCM</li>
                            <li class="dropdown-item">Drilling & Blasting</li>
                            <li class="dropdown-item">Mine Development</li>
                            <li class="dropdown-item">Load & haul</li>
                            <li class="dropdown-item">Mining</li>
                            <li class="dropdown-item">Logistics & Material Handling</li>
                            <li class="dropdown-item">Mining Fleet & Maintenance</li>
                            <li class="dropdown-item">Maintenance & Shutdown</li>
                        </ul>`
                },
            ],
            overviewDescription: '100 mines and projects with awarded and unawarded contracts',
        },
        {
            name: 'Production Costs',
            iconImg: './src/images/icons/modules/key-managers.svg',
            img: '.././scr/images/presentation/slides/project-costs-and-returns.jpeg',
            price: 100.00,
            video:"https://www.youtube.com/embed/8VESowgMbjA?si=qJbm3YA6jJnztTLo",
            serviceTabs: [
                {
                    title: "Cash Costs",
                    info: `<ul class="dropdown-menu">
                             <li class="dropdown-menu-list">
                             Synonym - mine site operating costs:
                                     <ul>
                                     <li class="dropdown-item">Mining costs</li>
                                           <li class="dropdown-item">Processing costs</li>
                                            <li class="dropdown-item">General & Administrative (G&A)</li>
                                    </ul>
                                    </li>
                            
                        </ul>`
                },
                {
                    title: "Total Cash Costs",
                    info: `<ul class="dropdown-menu">
                            <li class="dropdown-item">Cash Costs + royalties and production taxes, excluding income taxes</li>
                        </ul>`
                },
                {
                    title: "All-in Sustained Costs (AISC)",
                    info: `<ul class="dropdown-menu">
                            <li class="dropdown-menu-list">
                            Total Cash Costs + sustained expenditures:
                                    <ul>
                                        <li>Sustained CapEx</li>
                                        <li>Corporate G&A</li>
                                        <li>Site exploration & evaluation</li>
                                        <li>Closure expenditures</li>
                                     </ul>
                             </li>
                    
                        </ul>`
                },
                {
                    title: "All-in Costs ",
                    info: `<ul class="dropdown-menu">
                            <li class="dropdown-menu-list">
                           AISC + additonal costs:
                                    <ul>
                                        <li>Projects / Mine Expansion CapEx</li>
                                        <li>Growth projects exploration & evaluation</li>
                                        <li>Income tax payments</li>
                                        <li>Financing costs & divident payments</li>
                                     </ul>
                             </li>
                        </ul>`
                },
                {
                    title: "Unit Costs ($/t)",
                    info: `<ul class="dropdown-menu">
                            <li class="dropdown-item">Mining costs</li>
                            <li class="dropdown-item">Processing costs</li>
                            <li class="dropdown-item">G&A costs</li>
                            <li class="dropdown-item">Total Operating Costs </li>
                        </ul>`
                },


            ],
            overviewDescription: '1100 mines and projects with reported production costs',
        },
        {
            name: 'Project Costs & Returns',
            iconImg: './src/images/icons/modules/price-change.svg',
            img: '.././src/images/presentation/slides/project-costs-and-returns.jpeg',
            price: 100.00,
            video:"https://www.youtube.com/embed/8VESowgMbjA?si=qJbm3YA6jJnztTLo",
            serviceTabs: [
                {
                    title: "Capital Costs",
                    info: `<ul  class="dropdown-menu">
                            <li class="dropdown-item">Initial CapEx</li>
                            <li class="dropdown-item">Sustained CapEx</li>
                            <li class="dropdown-item">Closure costs</li>
                            <li class="dropdown-item">Total CapEx</li>
                        </ul>`
                },
                {
                    title: "Operating Costs",
                    info: `<ul  class="dropdown-menu">
                            <li class="dropdown-item">Mining OpEx</li>
                            <li class="dropdown-item">Crushing OpEx</li>
                            <li class="dropdown-item">Processing OpEx</li>
                            <li class="dropdown-item">Transportation costs</li>
                            <li class="dropdown-item">Refining costs</li>
                            <li class="dropdown-item">G&A costs</li>
                            <li class="dropdown-item">Total OpEx</li>
                        </ul>`
                },
                {
                    title: "Taxes and Royalties",
                    info: `<ul  class="dropdown-menu">
                            <li class="dropdown-item">Mining taxes</li>
                            <li class="dropdown-item">Income taxes</li>
                            <li class="dropdown-item">Royalty payments</li>
                            <li class="dropdown-item">Total taxes</li>
                        </ul>`
                },
                {
                    title: "Revenue",
                    info: `<ul  class="dropdown-menu">
                            <li class="dropdown-item">Gross revenue</li>
                            <li class="dropdown-item">Net revenue</li>
                            <li class="dropdown-item">EBITDA</li>
                            <li class="dropdown-item">Operating margin</li>
                            <li class="dropdown-item">Operating income</li>
                        </ul>`
                },{
                    title: "Key Performance Indicators",
                    info: `<ul  class="dropdown-menu">
                            <li class="dropdown-item">Cash Flow</li>
                            <li class="dropdown-item">Net Present Value (NPV)</li>
                            <li class="dropdown-item">Internal Rate of Return (IRR)</li>
                            <li class="dropdown-item">Payback period</li>
                        </ul>`
                },

            ],
            overviewDescription: '600 projects at PEA, PFS and Feasibility stages',
        },
        {
            name: 'Remote Mining Camps',
            iconImg: './src/images/icons/modules/key-managers.svg',
            img: '.././src/images/presentation/slides/commodity-production.jpeg',
            price: 100.00,
            video:"https://www.youtube.com/embed/8VESowgMbjA?si=qJbm3YA6jJnztTLo",
            serviceTabs: [
                {
                    title: "Camp size metrics",
                    info: `<ul  class="dropdown-menu">
                            <li class="dropdown-item">People</li>
                            <li class="dropdown-item">Beds</li>
                            <li class="dropdown-item">Rooms</li>
                        </ul>`
                },


            ],
            overviewDescription: '760 mines and projects with remote camps',
        },
    ]
};
