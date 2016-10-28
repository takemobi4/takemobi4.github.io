var availableAmtrakStations = [
      "Abbotsford, BC (CAABT)",
"Banff, AB (CABAF)",
"Canadian Border New York, ON (CACBN)",
"Calgary, AB (CACGY)",
"Coquitlam, BC (CACOQ)",
"Chilliwack, BC (CACWK)",
"Squamish/North Garibaldi, BC (CAGBC)",
"Golden, BC (CAGDN)",
"Hope, BC (CAHPE)",
"Kamloops, BC (CAKAM)",
"Kelowna, BC (CAKWN)",
"Langley, BC (CALGL)",
"Lake Louise, AB (CALKO)",
"London (Greyhound Canada), ON (CALOB)",
"Merritt, BC (CAMRR)",
"Pemberton, BC (CAPBT)",
"Richmond, BC (CARBC)",
"Surrey, BC (CASUY)",
"Toronto (Greyhound Canada), ON (CATCT)",
"Victoria (Bus Station), BC (CAVBC)",
"Victoria (Ferry), BC (CAVIF)",
"Westbank, BC (CAWEB)",
"Windsor (Greyhound Canada), ON (CAWNO)",
"Whistler Village, BC (CAWSL)",
"Vancouver, BC (CAXEA)",
"Grimsby, ON (CAXGY)",
"Saint-Lambert, QC (CAXLM)",
"Niagara Falls, ON (CAXLV)",
"Aldershot, ON (CAXLY)",
"Oakville, ON (CAXOK)",
"Toronto, ON (CAYBZ)",
"St. Catharines, ON (CAYCM)",
"Montreal, QC (CAYMY)",
"Abbotsford-Colby, WI (USABB)",
"Aberdeen, MD (USABE)",
"Absecon, NJ (USABN)",
"Albuquerque, NM (USABQ)",
"Antioch-Pittsburg, CA (USACA)",
"Atlantic City, NJ (USACY)",
"Ardmore, OK (USADM)",
"Augusta, ME (USAGM)",
"Ashland, OR (USAHL)",
"Ashland, KY (USAKY)",
"Alanson, MI (USALA)",
"Albany-Rensselaer, NY (USALB)",
"Alliance, OH (USALC)",
"Alderson, WV (USALD)",
"Albion, MI (USALI)",
"Alpena, MI (USALM)",
"Alton, IL (USALN)",
"Alpine, TX (USALP)",
"Altoona, PA (USALT)",
"Alexandria, VA (USALX)",
"Albany, OR (USALY)",
"Alamosa, CO (USAMC)",
"Amsterdam, NY (USAMS)",
"Anaheim, CA (USANA)",
"Appleton, WI (USAPP)",
"Ann Arbor, MI (USARB)",
"Arcata, CA (USARC)",
"Ardmore, PA (USARD)",
"Arkadelphia, AR (USARK)",
"Auburn, CA (USARN)",
"Astoria (Transit Center), OR (USART)",
"Ashland, VA (USASD)",
"Atascadero, CA (USATA)",
"Atlanta, GA (USATL)",
"Anniston, AL (USATN)",
"Atco, NJ (USATO)",
"Austin, TX (USAUS)",
"Autumn Express Train, MA (USAXP)",
"Baker City, OR (USBAK)",
"Baltimore (Penn Station), MD (USBAL)",
"Bangor, MI (USBAM)",
"Bangor, ME (USBAN)",
"Barstow (Amtrak), CA (USBAR)",
"Bath, ME (USBAT)",
"Barstow (Bus), CA (USBBS)",
"Boston (Back Bay), MA (USBBY)",
"Burke Centre, VA (USBCV)",
"Bay City, MI (USBCY)",
"Bend (Riverhouse), OR (USBDR)",
"Bradenton, FL (USBDT)",
"Bellingham, WA (USBEL)",
"Benson, AZ (USBEN)",
"Berlin, CT (USBER)",
"South Beloit, IL (USBET)",
"Bakersfield, CA (USBFD)",
"Belfast, ME (USBFT)",
"Buffalo (Exchange St), NY (USBFX)",
"Big Rapids, MI (USBGP)",
"Birmingham, AL (USBHM)",
"Biloxi (Bus Station), MS (USBIG)",
"Berlin, NH (USBIN)",
"Brookings, OR (USBKO)",
"Berkeley, CA (USBKY)",
"Bellows Falls, VT (USBLF)",
"Blacksburg, VA (USBLK)",
"Beaumont, TX (USBMT)",
"Burlington, NC (USBNC)",
"Bend (Hawthorne Intermodal Center), OR (USBND)",
"Bingen-White Salmon, WA (USBNG)",
"Bloomington-Normal, IL (USBNL)",
"Burns, OR (USBNS)",
"Boise, ID (USBOI)",
"Boston (North Station), MA (USBON)",
"Boston (South Station), MA (USBOS)",
"Brattleboro, VT (USBRA)",
"Brookhaven, MS (USBRH)",
"Brunswick, ME (USBRK)",
"Burlington, IA (USBRL)",
"Browning, MT (USBRO)",
"Bridgeport, CT (USBRP)",
"Brent, AL (USBRR)",
"Bryan, TX (USBRY)",
"Battle Creek, MI (USBTL)",
"Baton Rouge, LA (USBTR)",
"Buffalo-Depew, NY (USBUF)",
"Buellton, CA (USBUL)",
"Burbank (Airport), CA (USBUR)",
"Buena Vista, CO (USBUV)",
"Beaver Dam, WI (USBVD)",
"BWI Thurgood Marshall Airport Station, MD (USBWI)",
"Brewster, WA (USBWW)",
"Bryan, OH (USBYN)",
"Camden, SC (USCAM)",
"Conway, NH (USCAY)",
"Cannon Beach, OR (USCBO)",
"Cleburne, TX (USCBR)",
"Columbus, WI (USCBS)",
"Carlsbad (Village), CA (USCBV)",
"Coos Bay, OR (USCBY)",
"Cabazon, CA (USCBZ)",
"Cambridge, MD (USCDE)",
"Carbondale (Amtrak), IL (USCDL)",
"Camden/Rockport, ME (USCDN)",
"Centralia, IL (USCEN)",
"Colfax, WA (USCFX)",
"Coarsegold, CA (USCGD)",
"Cheboygan, MI (USCHB)",
"Cheyenne (Greyhound), WY (USCHD)",
"Chicago (Chicago Union Station), IL (USCHI)",
"Charlevoix, MI (USCHL)",
"Champaign-Urbana, IL (USCHM)",
"Chippewa Falls, WI (USCHP)",
"Charleston, SC (USCHS)",
"Charleston, WV (USCHW)",
"Chico, CA (USCIC)",
"Cincinnati (Greyhound), OH (USCIG)",
"Cincinnati (Amtrak), OH (USCIN)",
"Claremont, NH (USCLA)",
"Columbia, SC (USCLB)",
"Cadillac, MI (USCLC)",
"Cleveland, OH (USCLE)",
"Clifton Forge, VA (USCLF)",
"Columbia, MO (USCLI)",
"Crater Lake, OR (USCLK)",
"Claremont, CA (USCLM)",
"Culpeper, VA (USCLP)",
"Charlotte, NC (USCLT)",
"Cloverdale, CA (USCLV)",
"Camden, AL (USCMD)",
"Camarillo, CA (USCML)",
"Chemult, OR (USCMO)",
"Concord, NH (USCNH)",
"Colonel Allensworth Park, CA (USCNL)",
"Castleton, VT (USCNV)",
"Corcoran, CA (USCOC)",
"Connersville, IN (USCOI)",
"Columbus, OH (USCOL)",
"Colorado Springs, CO (USCOS)",
"Coatesville, PA (USCOT)",
"Connellsville, PA (USCOV)",
"Colfax, CA (USCOX)",
"Carpinteria, CA (USCPN)",
"Crescent City, CA (USCRC)",
"Crawfordsville, IN (USCRF)",
"Cherry Hill, NJ (USCRH)",
"Clarksville, TN (USCRK)",
"Carmel, CA (USCRM)",
"Creston, IA (USCRN)",
"Croton Harmon, NY (USCRT)",
"Carlinville, IL (USCRV)",
"Clemson, SC (USCSN)",
"Centralia, WA (USCTL)",
"Cumberland (Allegany College), MD (USCUA)",
"Cumberland (Amtrak Station), MD (USCUM)",
"Cut Bank, MT (USCUT)",
"Camp Verde, AZ (USCVD)",
"Corvallis (Greyhound), OR (USCVI)",
"Cave Junction, OR (USCVJ)",
"Colville, WA (USCVL)",
"Corvallis (Oregon State University), OR (USCVO)",
"Charlottesville, VA (USCVS)",
"Cornwells Heights, PA (USCWH)",
"Chewelah, WA (USCWL)",
"Chatsworth, CA (USCWT)",
"Cary, NC (USCYN)",
"Dallas (Greyhound), TX (USDAG)",
"Dallas (Union Station), TX (USDAL)",
"Damariscotta, ME (USDAM)",
"Danville, VA (USDAN)",
"Dayton-Trotwood, OH (USDAT)",
"Davis, CA (USDAV)",
"Dublin-Pleasanton, CA (USDBP)",
"Dade City, FL (USDDE)",
"Dodge City, KS (USDDG)",
"Denver (Bus Station), CO (USDEB)",
"Deming, NM (USDEM)",
"Denver, CO (USDEN)",
"Dearborn, MI (USDER)",
"Detroit, MI (USDET)",
"Deerfield Beach, FL (USDFB)",
"Durham, NH (USDHM)",
"Dillon, SC (USDIL)",
"Delray Beach, FL (USDLB)",
"Deland, FL (USDLD)",
"Detroit Lakes, MN (USDLK)",
"Durham, NC (USDNC)",
"Denmark, SC (USDNK)",
"Dowagiac, MI (USDOA)",
"Dover, NH (USDOV)",
"Downingtown, PA (USDOW)",
"Deer Park, WA (USDPK)",
"Du Quoin, IL (USDQN)",
"Durand, MI (USDRD)",
"Del Rio, TX (USDRT)",
"Detroit, OR (USDTO)",
"Dunkirk, NY (USDUK)",
"Duluth (Bus Depot), MN (USDUL)",
"Dunsmuir, CA (USDUN)",
"Duluth (University of Minnesota), MN (USDUU)",
"Danville, IL (USDVI)",
"Devils Lake, ND (USDVL)",
"Davenport, IA (USDVP)",
"Dover, DE (USDVR)",
"Dwight, IL (USDWT)",
"Daytona Beach, FL (USDYA)",
"Dyer, IN (USDYE)",
"Edmonds, WA (USEDM)",
"Effingham, IL (USEFG)",
"Egg Harbor City, NJ (USEGH)",
"Eureka, CA (USEKA)",
"Elk Grove, CA (USEKG)",
"Elkhart, IN (USEKH)",
"El Paso (Bus Station), TX (USELB)",
"Elko, NV (USELK)",
"El Paso (Amtrak Station), TX (USELP)",
"Elsie, OR (USELS)",
"Elizabethtown, PA (USELT)",
"Elyria, OH (USELY)",
"Escanaba, MI (USEMI)",
"Emeryville, CA (USEMY)",
"Encinitas, CA (USENC)",
"Ephrata (Train), WA (USEPH)",
"El Portal, CA (USEPL)",
"Ephrata (Bus), WA (USEPR)",
"Erie, PA (USERI)",
"El Segundo, CA (USESG)",
"Essex, MT (USESM)",
"Easton, MD (USESN)",
"Essex Junction, VT (USESX)",
"Eugene (Bus Station), OR (USEUB)",
"Eau Claire (University of Wisconsin), WI (USEUC)",
"Eugene, OR (USEUG)",
"Eugene (University of Oregon), OR (USEUO)",
"Evansville, IN (USEVN)",
"Everett, WA (USEVR)",
"Evanston (Greyhound), WY (USEVY)",
"Newark Liberty International Airport, NJ (USEWR)",
"Exeter, NH (USEXR)",
"Exton, PA (USEXT)",
"Fargo, ND (USFAR)",
"Fayetteville, NC (USFAY)",
"Fredericksburg, VA (USFBG)",
"Fort Collins (Greyhound), CO (USFCC)",
"Fond du Lac, WI (USFDL)",
"Fredonia, NY (USFDN)",
"Fort Edward-Glens Falls, NY (USFED)",
"Flagstaff (Greyhound), AZ (USFGG)",
"Fort Hood, TX (USFHD)",
"Fillmore, CA (USFIL)",
"Flagstaff, AZ (USFLG)",
"Flint, MI (USFLN)",
"Florence, SC (USFLO)",
"Fort Madison, IA (USFMD)",
"Fort Morgan, CO (USFMG)",
"Fremont (Capitol Trains), CA (USFMT)",
"Fresno, CA (USFNO)",
"Foxwoods Casino, CT (USFOX)",
"Framingham, MA (USFRA)",
"Frederick (Transit Center), MD (USFRC)",
"Freeport, ME (USFRE)",
"Florence, OR (USFRO)",
"Fairplay, CO (USFRP)",
"Frederick (Airport), MD (USFRR)",
"Fremont (San Joaquin Buses), CA (USFRT)",
"Frostburg, MD (USFSB)",
"Frisco, CO (USFSC)",
"Fish Camp, CA (USFSH)",
"Fortuna, CA (USFTA)",
"Ticonderoga, NY (USFTC)",
"Fort Lauderdale, FL (USFTL)",
"Fort Myers, FL (USFTM)",
"Fulton, KY (USFTN)",
"Fort Worth, TX (USFTW)",
"Fullerton, CA (USFUL)",
"Santa Clara (Great America), CA (USGAC)",
"Gastonia, NC (USGAS)",
"Galesburg, IL (USGBB)",
"Goldsboro, NC (USGBO)",
"Garberville, CA (USGBV)",
"Green Bay, WI (USGBY)",
"Grand Canyon National Park (Buses), AZ (USGCB)",
"Garden City, KS (USGCK)",
"Grand Canyon National Park (Railway), AZ (USGCN)",
"Glendale, CA (USGDL)",
"Greenfield, MA (USGFD)",
"Grand Forks, ND (USGFK)",
"Glasgow, MT (USGGW)",
"Gold Hill, OR (USGHL)",
"Gearhart, OR (USGHT)",
"Grand Junction, CO (USGJT)",
"Gainesville, TX (USGLE)",
"Gilman, IL (USGLM)",
"Glenview, IL (USGLN)",
"Gallup, NM (USGLP)",
"Galveston, TX (USGLS)",
"Gilroy, CA (USGLY)",
"Greensburg, PA (USGNB)",
"Gainesville, FL (USGNF)",
"Gainesville, GA (USGNS)",
"Gunnison (Western State University), CO (USGNW)",
"East Glacier Park, MT (USGPK)",
"Granby, CO (USGRA)",
"Green River, UT (USGRI)",
"Greenville, NC (USGRN)",
"Greensboro, NC (USGRO)",
"Grand Rapids, MI (USGRR)",
"Greenville, SC (USGRV)",
"Gary, IN (USGRY)",
"Glenwood Springs, CO (USGSC)",
"Goshen Junction, CA (USGSN)",
"Goleta, CA (USGTA)",
"Grants Pass, OR (USGTP)",
"Grantsville, MD (USGTV)",
"Guadalupe-Santa Maria, CA (USGUA)",
"Gulfport (Bus Station), MS (USGUG)",
"Gunnison (Downtown). Colorado, CO (USGUN)",
"Grover Beach, CA (USGVB)",
"Grove Hill, AL (USGVH)",
"Grangeville, ID (USGVI)",
"Greenwood, MS (USGWD)",
"Hagerstown, MD (USHAG)",
"Hamlet, NC (USHAM)",
"Harrisburg, PA (USHAR)",
"Hastings, NE (USHAS)",
"Havre, MT (USHAV)",
"Hayward, CA (USHAY)",
"Hazlehurst, MS (USHAZ)",
"Hattiesburg (Amtrak Station), MS (USHBG)",
"Hattiesburg (Bus Station), MS (USHBI)",
"Healdsburg, CA (USHEA)",
"Hermann, MO (USHEM)",
"Helper, UT (USHER)",
"Hemet (West Florida Ave), CA (USHET)",
"Hartford, CT (USHFD)",
"Harpers Ferry, WV (USHFY)",
"Huntingdon, PA (USHGD)",
"Houghton, MI (USHGH)",
"Haverhill, MA (USHHL)",
"Hinton, WV (USHIN)",
"Hancock, MI (USHKM)",
"Holdrege, NE (USHLD)",
"Holyoke, MA (USHLK)",
"Hammond, LA (USHMD)",
"Hammond-Whiting, IN (USHMI)",
"Hemet (Devonshire Ave), CA (USHMT)",
"Homewood, IL (USHMW)",
"Hanford, CA (USHNF)",
"Hancock, MD (USHNK)",
"Houston (Greyhound), TX (USHOG)",
"Hollywood, FL (USHOL)",
"Holland, MI (USHOM)",
"Hood River, OR (USHOO)",
"Hope, AR (USHOP)",
"Houston (Amtrak), TX (USHOS)",
"High Point, NC (USHPT)",
"Hammonton, NJ (USHTN)",
"Hudson, NY (USHUD)",
"Huntington, WV (USHUN)",
"Hutchinson, KS (USHUT)",
"Havelock, NC (USHVL)",
"Howard City, MI (USHWC)",
"Indio, CA (USIDO)",
"Independence, MO (USIDP)",
"Indianapolis, IN (USIND)",
"Irvine, CA (USIRV)",
"Jackson, AL (USJAA)",
"Jackson, MS (USJAN)",
"Jacksonville, FL (USJAX)",
"Jefferson City, MO (USJEF)",
"Jamestown, NY (USJMN)",
"Jacksonville, NC (USJNC)",
"June Lake, CA (USJNL)",
"Joliet, IL (USJOL)",
"Jesup, GA (USJSP)",
"Johnstown, PA (USJST)",
"Janesville, WI (USJVL)",
"Jackson, MI (USJXN)",
"Kalamazoo, MI (USKAL)",
"Kannapolis, NC (USKAN)",
"Kansas City (Greyhound), MO (USKCG)",
"Kansas City (Amtrak-Union Station), MO (USKCY)",
"Kewanee, IL (USKEE)",
"Kelso-Longview, WA (USKEL)",
"Klamath Falls, OR (USKFS)",
"King City, CA (USKGC)",
"Kingsley, MI (USKGS)",
"Kings Canyon National Park, CA (USKGY)",
"Killeen, TX (USKIL)",
"Kingston, RI (USKIN)",
"Kissimmee, FL (USKIS)",
"Kankakee, IL (USKKI)",
"Killington, VT (USKLT)",
"Kinston, NC (USKNC)",
"Kingman, AZ (USKNG)",
"Grasonville, MD (USKNT)",
"Kettleman City, CA (USKTC)",
"Kettle Falls, WA (USKTF)",
"Kingstree, SC (USKTR)",
"Kirkwood, MO (USKWD)",
"Latrobe, PA (USLAB)",
"La Grande, OR (USLAE)",
"Lafayette, IN (USLAF)",
"La Grange Road, IL (USLAG)",
"La Junta, CO (USLAJ)",
"Lakeland - Departure 92 North Arrival 91 South, FL (To/From Points North), FL (USLAK)",
"L'Anse, MI (USLAN)",
"La Plata, MO (USLAP)",
"Las Vegas International Airport, NV (USLAS)",
"Laurel, MS (USLAU)",
"Los Angeles, CA (USLAX)",
"Long Beach (Transit Gallery), CA (USLBC)",
"La Crescenta, CA (USLCA)",
"Lake Charles, LA (USLCH)",
"Lincoln, IL (USLCN)",
"Las Cruces, NM (USLCR)",
"Lancaster, CA (USLCS)",
"Lincolnville, ME (USLCV)",
"Lordsburg, NM (USLDB)",
"Lindenwold, NJ (USLDW)",
"Lee's Summit, MO (USLEE)",
"Leggett, CA (USLEG)",
"Leavenworth (Buses), WA (USLEV)",
"Lewistown, PA (USLEW)",
"Lexington, NC (USLEX)",
"Lafayette, LA (USLFT)",
"Lego Land, Carlsbad, CA (USLGO)",
"Libby, MT (USLIB)",
"Livermore (Transit Center), CA (USLIV)",
"Lakeland - Departure 91 North Arrival 92 South, FL (To/From Points South), FL (USLKL)",
"Loon Lake, WA (USLLK)",
"Lemoore, CA (USLMC)",
"Lemoore (Naval Air Station), CA (USLMN)",
"Lamar, CO (USLMR)",
"Lamy, NM (USLMY)",
"Lancaster, PA (USLNC)",
"Lincoln, NE (USLNK)",
"Lincoln, NH (USLNN)",
"East Lansing, MI (USLNS)",
"Laughlin, NV (USLNV)",
"Lodi, CA (USLOD)",
"Los Alamos (White Rock Area), NM (USLOH)",
"Lompoc, CA (USLOM)",
"Los Alamos (Central Area), NM (USLOS)",
"Lake Placid, NY (USLPD)",
"Lapeer, MI (USLPE)",
"La Pine, OR (USLPN)",
"Lompoc-Surf, CA (USLPS)",
"La Quinta, CA (USLQT)",
"Lawrence, KS (USLRC)",
"Little Rock, AR (USLRK)",
"Laramie (Greyhound), WY (USLRY)",
"La Crosse, WI (USLSE)",
"Las Vegas, NM (USLSV)",
"Littleton, NH (USLTL)",
"Lathrop/Manteca, CA (USLTM)",
"Littlerock, CA (USLTR)",
"Laytonville, CA (USLTV)",
"Livingston, MT (USLVG)",
"Louisville, KY (USLVL)",
"Lee Vining, CA (USLVN)",
"Las Vegas (Downtown), NV (USLVS)",
"Las Vegas (Strip), NV (USLVT)",
"Longview, TX (USLVW)",
"Leavenworth (Trains), WA (USLWA)",
"Lewiston, ID (USLWN)",
"Lynchburg, VA (USLYH)",
"Marion, AL (USMAA)",
"Macomb, IL (USMAC)",
"Marion, IL (USMAI)",
"Mackinaw City, MI (USMAK)",
"Malta, MT (USMAL)",
"Marceline, MO (USMAR)",
"Mattoon, IL (USMAT)",
"Maysville, KY (USMAY)",
"McCall, ID (USMCA)",
"McComb, MS (USMCB)",
"Merced, CA (USMCD)",
"McGregor, TX (USMCG)",
"Michigan City, IN (USMCI)",
"McCook, NE (USMCK)",
"Meriden, CT (USMDN)",
"Midpines, CA (USMDP)",
"Madera, CA (USMDR)",
"Mendota, IL (USMDT)",
"Madisonville, KY (USMDV)",
"Monroe (Eastbound), WA (USMEE)",
"Meridian, MS (USMEI)",
"Memphis, TN (USMEM)",
"Metropark (Iselin), NJ (USMET)",
"Monroe (Westbound), WA (USMEW)",
"Medford, OR (USMFR)",
"Moffat, CO (USMFT)",
"Montgomery, AL (USMGM)",
"Mangonia Park, FL (USMGP)",
"Morgan Hill, CA (USMHC)",
"Morehead City, NC (USMHD)",
"Marshall, TX (USMHL)",
"Manchester, NH (USMHT)",
"Miami, FL (USMIA)",
"Middletown, PA (USMID)",
"Mineola, TX (USMIN)",
"Mount Joy, PA (USMJY)",
"Milwaukee (General Mitchell Intl Airport), WI (USMKA)",
"Milwaukee (Intermodal Station), WI (USMKE)",
"McKinleyville, CA (USMKV)",
"Moline, IL (USMLI)",
"Moses Lake, WA (USMLK)",
"Mammoth Lakes, CA (USMMK)",
"Montgomery, WV (USMNG)",
"Manning, OR (USMNI)",
"Menomonie, WI (USMNM)",
"Moscow, ID (USMOC)",
"Modesto, CA (USMOD)",
"Mobile (Bus Station), AL (USMOG)",
"Mojave, CA (USMOJ)",
"Minot, ND (USMOT)",
"Moreno Valley, CA (USMOV)",
"Moorpark, CA (USMPK)",
"Montpelier-Berlin, VT (USMPR)",
"Marquette, MI (USMQT)",
"Martinsburg, WV (USMRB)",
"Maricopa, AZ (USMRC)",
"Mariposa (Midtown), CA (USMRM)",
"Mariposa (Park and Ride), CA (USMRP)",
"Marysville, CA (USMRV)",
"Monterey (Transit Plaza), CA (USMRY)",
"Minneapolis-St. Paul Intl Airport, St. Paul, MN (USMSL)",
"Madison (University of Wisconsin), WI (USMSN)",
"St. Paul-Minneapolis, MN (USMSP)",
"Mesquite, TX (USMSQ)",
"Manassas, VA (USMSS)",
"Manitowoc, WI (USMTC)",
"Manton, MI (USMTO)",
"Mount Pleasant, IA (USMTP)",
"Mt. Vernon, AL (USMTV)",
"Martinez, CA (USMTZ)",
"Mt. Vernon, IL (USMVI)",
"Malvern, AR (USMVN)",
"Mount Vernon, WA (USMVW)",
"Marinette, WI (USMWI)",
"Monterey (Aquarium), CA (USMYA)",
"Monterey (Hyatt Regency), CA (USMYH)",
"Monterey (Marriott), CA (USMYM)",
"Mystic, CT (USMYS)",
"Monterey (MST Bus Stop at Chevron Station), CA (USMYT)",
"Nampa, ID (USNAM)",
"Napa, CA (USNAP)",
"New Brunswick, NJ (USNBK)",
"Newbern-Dyersburg, TN (USNBN)",
"New Bern, NC (USNBR)",
"Newburyport, MA (USNBT)",
"New Buffalo, MI (USNBU)",
"Nacogdoches, TX (USNCG)",
"Necanicum Junction, OR (USNCM)",
"New Carrollton, MD (USNCR)",
"North Conway, NH (USNCW)",
"Needles, CA (USNDL)",
"Newton, KS (USNEW)",
"Norfolk, VA (USNFK)",
"Niagara Falls, NY (USNFL)",
"Santa Clarita-Newhall, CA (USNHL)",
"Northampton, MA (USNHT)",
"New Haven, CT (USNHV)",
"New Iberia, LA (USNIB)",
"New London, CT (USNLC)",
"Niles, MI (USNLS)",
"New Orleans, LA (USNOL)",
"Norman, OK (USNOR)",
"Newport News, VA (USNPN)",
"Newport, OR (USNPO)",
"Naperville, IL (USNPV)",
"Newark, DE (USNRK)",
"New Rochelle, NY (USNRO)",
"North Carolina State Fair, NC (USNSF)",
"Nashua, NH (USNSH)",
"Nashville, TN (USNVL)",
"Newark (Penn Station), NJ (USNWK)",
"New York State Fair, NY (USNYF)",
"New York (Penn Station), NY (USNYP)",
"Oakland (Coliseum/Airport), CA (USOAC)",
"Oakhurst, CA (USOAH)",
"Ocala, FL (USOCA)",
"Ocean City, MD (USOCM)",
"Oconto, WI (USOCO)",
"Ocean Pines, MD (USOCP)",
"Ogden, UT (USOGD)",
"Okanagan, WA (USOGW)",
"Oklahoma City, OK (USOKC)",
"Okeechobee, FL (USOKE)",
"Oakland (Jack London Square), CA (USOKJ)",
"San Diego (Old Town), CA (USOLT)",
"Olympia-Lacey, WA (USOLW)",
"Omaha, NE (USOMA)",
"Omak, WA (USOMW)",
"Ontario, CA (USONA)",
"Ontario, OR (USONT)",
"Old Orchard Beach (Seasonal), ME (USORB)",
"Oregon City, OR (USORC)",
"Orlando, FL (USORL)",
"Orono-University of Maine, ME (USORO)",
"Oroville, CA (USORV)",
"Old Saybrook, CT (USOSB)",
"Osceola, IA (USOSC)",
"Oceanside, CA (USOSD)",
"Oshkosh (Airport), WI (USOSH)",
"Oshkosh (University of Wisconsin), WI (USOSU)",
"Ottumwa, IA (USOTM)",
"Owosso, MI (USOWO)",
"Oxnard, CA (USOXN)",
"Paducah, KY (USPAD)",
"Palatka, FL (USPAK)",
"Paoli, PA (USPAO)",
"Parkesburg, PA (USPAR)",
"Pasadena, CA (USPAS)",
"Poplar Bluff, MO (USPBF)",
"Port Charlotte, FL (USPCH)",
"Princeton, IL (USPCT)",
"Placerville, CA (USPCV)",
"Palm Desert, CA (USPDC)",
"Portland (Greyhound Station), OR (USPDG)",
"Prunedale, CA (USPDL)",
"Portland (Amtrak - Union Station), OR (USPDX)",
"Pendleton, OR (USPEN)",
"Pittsburgh, PA (USPGH)",
"Phoenix (Airport), AZ (USPHA)",
"Phoenix (Greyhound), AZ (USPHG)",
"Philadelphia (30th St), PA (USPHL)",
"Philadelphia (North), PA (USPHN)",
"Peoria, IL (USPIA)",
"Picayune, MS (USPIC)",
"Pittsfield, MA (USPIT)",
"Peoria-Bradley University, IL (USPIU)",
"Princeton Junction, NJ (USPJC)",
"Pine Junction, CO (USPJT)",
"Plattsburgh, NY (USPLB)",
"Plano, IL (USPLO)",
"Pleasanton (ACE Station), CA (USPLS)",
"Palmdale, CA (USPMD)",
"Plymouth, NH (USPMO)",
"Pennsauken, NJ (USPNK)",
"Pontiac, MI (USPNT)",
"Portage, WI (USPOG)",
"Port Henry, NY (USPOH)",
"Carlsbad (Poinsettia), CA (USPOI)",
"Pontiac, IL (USPON)",
"Portland, ME (USPOR)",
"Pomona (Sunset Ltd), CA (USPOS)",
"Poughkeepsie, NY (USPOU)",
"Paso Robles, CA (USPRB)",
"Prince (Beckley), WV (USPRC)",
"Perris, CA (USPRI)",
"Port Kent, NY (USPRK)",
"Provo, UT (USPRO)",
"Pasco, WA (USPSC)",
"Poncha Springs, CO (USPSG)",
"Petoskey, MI (USPSK)",
"Palm Springs (Train), CA (USPSN)",
"Palm Springs (Buses-Airport), CA (USPSP)",
"Palm Springs (Buses-Downtown), CA (USPSS)",
"Pellston, MI (USPST)",
"Petersburg, VA (USPTB)",
"Petaluma, CA (USPTC)",
"Pateros, WA (USPTE)",
"Port Huron, MI (USPTH)",
"Portsmouth, NH (USPTS)",
"Pueblo, CO (USPUB)",
"Pullman, WA (USPUL)",
"Purcell, OK (USPUR)",
"Providence, RI (USPVD)",
"Pauls Valley, OK (USPVL)",
"Prairie View, TX (USPVW)",
"Phoenix (Metro Center Transit Station), AZ (USPXN)",
"Quantico, VA (USQAN)",
"Quincy, IL (USQCY)",
"Quincy, WA (USQUC)",
"Raton, NM (USRAT)",
"Red Bluff, CA (USRBF)",
"Rockford, IL (USRCK)",
"Redding (Coast Starlight train), CA (USRDD)",
"Redmond Airport, OR (USRDM)",
"Redding (RABA Transit Center), CA (USRDR)",
"Rio Dell-Scotia, CA (USRDS)",
"Red Wing, MN (USRDW)",
"Reed City, MI (USREE)",
"Rensselaer, IN (USREN)",
"Raleigh, NC (USRGH)",
"Rhinecliff, NY (USRHI)",
"Richmond, CA (USRIC)",
"Riverside, CA (USRIV)",
"Rockford, MI (USRKF)",
"Rock Island, IL (USRKI)",
"Rockville, MD (USRKV)",
"Rocklin, CA (USRLN)",
"Rochester, MN (USRMN)",
"Rocky Mount, NC (USRMT)",
"Roanoke, VA (USRNK)",
"Reno, NV (USRNO)",
"Rochester, NY (USROC)",
"Rockland, ME (USROD)",
"Rome, NY (USROM)",
"Royal Oak, MI (USROY)",
"Rohnert Park, CA (USRPC)",
"Randolph, VT (USRPH)",
"Reedsport, OR (USRPT)",
"Rouses Point, NY (USRSP)",
"Roseville, CA (USRSV)",
"Rock Springs (Greyhound), WY (USRSY)",
"Boston Route 128, MA (USRTE)",
"Rantoul, IL (USRTL)",
"Ritzville, WA (USRTZ)",
"Rutland, VT (USRUD)",
"Rugby, ND (USRUG)",
"Richmond (Main St), VA (USRVM)",
"Richmond (Staples Mill Rd), VA (USRVR)",
"Rawlins (Greyhound), WY (USRWY)",
"St. Albans, VT (USSAB)",
"Sacramento, CA (USSAC)",
"Santa Fe (Four Seasons Area), NM (USSAE)",
"Santa Fe (Central Area), NM (USSAF)",
"Salisbury, NC (USSAL)",
"San Diego (Downtown), CA (USSAN)",
"Saco, ME (USSAO)",
"Santa Paula, CA (USSAP)",
"Saratoga Springs, NY (USSAR)",
"San Antonio, TX (USSAS)",
"Santa Maria, CA (USSAT)",
"Savannah, GA (USSAV)",
"Santa Barbara, CA (USSBA)",
"Sebring, FL (USSBG)",
"Shelby, MT (USSBY)",
"Santa Clara (University), CA (USSCC)",
"St. Cloud, MN (USSCD)",
"Schriever, LA (USSCH)",
"Sacramento (State Capitol), CA (USSCS)",
"Santa Cruz, CA (USSCZ)",
"Sedona, AZ (USSDC)",
"Slidell, LA (USSDL)",
"Schenectady, NY (USSDY)",
"Seattle (King St. Station), WA (USSEA)",
"Sedalia, MO (USSED)",
"Seaside-Sand City, CA (USSES)",
"San Francisco (Transbay Temporary Terminal), CA (USSFC)",
"San Francisco (Financial), CA (USSFF)",
"San Francisco (Groups Only), CA (USSFG)",
"San Francisco (Shopping), CA (USSFS)",
"San Francisco (Wharf), CA (USSFW)",
"Saginaw, MI (USSGW)",
"Sheboygan, WI (USSHB)",
"Shreveport (Greyhound), LA (USSHG)",
"Shreveport (Airport), LA (USSHR)",
"Shawano, WI (USSHW)",
"Simi Valley, CA (USSIM)",
"San Jose, CA (USSJC)",
"St. Joseph, MI (USSJM)",
"Skykomish (Eastbound), WA (USSKE)",
"Stockton (Trains 711-718), CA (USSKN)",
"Stockton (Trains 701-704), CA (USSKT)",
"Skykomish (Westbound), WA (USSKW)",
"Sandusky, OH (USSKY)",
"Selma, AL (USSLA)",
"Salt Lake City (Buses), UT (USSLB)",
"Salt Lake City (Amtrak), UT (USSLC)",
"Salida, CO (USSLD)",
"Stateline Transit Center, CA (USSLH)",
"Salem, OR (USSLM)",
"Stateline, NV (USSLN)",
"San Luis Obispo, CA (USSLO)",
"San Luis Obispo (Cal Poly), CA (USSLP)",
"Salisbury (BayRunner Shuttle), MD (USSLS)",
"South Lake Tahoe, CA (USSLT)",
"Solvang, CA (USSLV)",
"Salisbury (Greyhound), MD (USSLY)",
"San Marcos, TX (USSMC)",
"Madison (Dutch Mill), WI (USSMD)",
"Sault Sainte Marie, MI (USSMI)",
"Smith River, CA (USSMR)",
"Summit, IL (USSMT)",
"Santa Ana, CA (USSNA)",
"San Bernardino (Amtrak Station), CA (USSNB)",
"San Juan Capistrano, CA (USSNC)",
"Sanderson, TX (USSND)",
"San Clemente Pier, CA (USSNP)",
"Salinas (Transit Center), CA (USSNR)",
"Salinas (Amtrak Station), CA (USSNS)",
"Stanley, WI (USSNY)",
"South Bend (Amtrak Station), IN (USSOB)",
"Solana Beach, CA (USSOL)",
"Southern Pines, NC (USSOP)",
"Spartanburg, SC (USSPB)",
"San Pedro (Catalina Terminal), CA (USSPD)",
"Springfield, MA (USSPG)",
"Springfield, IL (USSPI)",
"Spokane, WA (USSPK)",
"Staples, MN (USSPL)",
"South Shore-South Portsmouth, KY (USSPM)",
"San Pedro (Downtown), CA (USSPO)",
"Sandpoint, ID (USSPT)",
"Sparks (Thruway Buses), NV (USSPX)",
"Sarasota, FL (USSRA)",
"Sorrento Valley, CA (USSRB)",
"Santa Rosa, CA (USSRC)",
"Scranton, PA (USSRN)",
"Searsport, ME (USSRT)",
"Seaside, OR (USSSD)",
"Selma, NC (USSSM)",
"Stevens Pass, WA (USSSW)",
"Staunton, VA (USSTA)",
"St. George, UT (USSTG)",
"St. Ignace, MI (USSTI)",
"St. Louis, MO (USSTL)",
"Stamford, CT (USSTM)",
"Stanley, ND (USSTN)",
"Sisters, OR (USSTO)",
"St Petersburg-Clearwater, FL (USSTP)",
"Stanwood, WA (USSTW)",
"Suisun-Fairfield, CA (USSUI)",
"Sunriver, OR (USSUN)",
"Sun City-Menifee, CA (USSUT)",
"Seattle (Ferry - Pier 69), WA (USSVF)",
"Stevens Point (200 Division St), WI (USSVP)",
"Sturtevant, WI (USSVT)",
"Stevens Point (University of Wisconsin), WI (USSVU)",
"Scotts Valley, CA (USSVY)",
"Syracuse, NY (USSYR)",
"Tacoma, WA (USTAC)",
"Taylor, TX (USTAY)",
"Toccoa, GA (USTCA)",
"Tuscaloosa, AL (USTCL)",
"Toledo, OR (USTDO)",
"Tehachapi, CA (USTEH)",
"Twin Falls, ID (USTFI)",
"The Dalles, OR (USTHD)",
"Thomasville, AL (USTHM)",
"Thurmond, WV (USTHN)",
"Tilton, NH (USTLT)",
"Torrance, CA (USTOA)",
"Tomah, WI (USTOH)",
"Toledo, OH (USTOL)",
"Topeka, KS (USTOP)",
"Tampa, FL (USTPA)",
"Temple, TX (USTPL)",
"Tracy (Bus), CA (USTRA)",
"Tracy (ACE Station), CA (USTRC)",
"Trenton, NJ (USTRE)",
"Trinidad, CO (USTRI)",
"Turlock-Denair, CA (USTRK)",
"Troy, MI (USTRM)",
"Truckee, CA (USTRU)",
"Traverse City, MI (USTRV)",
"Tusayan, AZ (USTSY)",
"Tukwila, WA (USTUK)",
"Tucson, AZ (USTUS)",
"The Villages, FL (USTVF)",
"Tawas City, MI (USTWC)",
"Texarkana, AR (USTXA)",
"Tyler, TX (USTYL)",
"Tyrone, PA (USTYR)",
"Utica, NY (USUCA)",
"Ukiah, CA (USUKH)",
"Winston-Salem State Univ, Winston-Salem, NC (USUWS)",
"Virginia Beach, VA (USVAB)",
"Vale, OR (USVAE)",
"Vail, CO (USVAI)",
"Vallejo, CA (USVAL)",
"Vancouver, WA (USVAN)",
"Livermore (Vasco Road-ACE Station), CA (USVAS)",
"Ventura, CA (USVEC)",
"Visalia, CA (USVIS)",
"Vicksburg, MS (USVKS)",
"Six Flags Discovery Kingdom (Seasonal), Vallejo, CA (USVMW)",
"Vienna, IL (USVNA)",
"Van Nuys, CA (USVNC)",
"Victorville (Thruway Buses), CA (USVRB)",
"Victorville (Southwest Chief train), CA (USVRV)",
"Waterbury, VT (USWAB)",
"Wasco, CA (USWAC)",
"Washington, MO (USWAH)",
"Warrensburg, MO (USWAR)",
"Washington, DC (USWAS)",
"Waupaca, WI (USWAU)",
"Williamsburg, VA (USWBG)",
"Woodburn, OR (USWBN)",
"Westchester, CA (USWCH)",
"White City, OR (USWCT)",
"Waco, TX (USWCX)",
"Woodbridge, VA (USWDB)",
"Wisconsin Dells, WI (USWDL)",
"Waldo, FL (USWDO)",
"Waldoboro, ME (USWDR)",
"Wenatchee (Thruway Bus), WA (USWEC)",
"Wells, ME (USWEM)",
"Wenatchee (Amtrak Trains), WA (USWEN)",
"Westwood-UCLA, CA (USWES)",
"Wallingford, CT (USWFD)",
"Whitefish, MT (USWFH)",
"West Glacier, MT (USWGL)",
"Whitehall, NY (USWHL)",
"White Haven, PA (USWHV)",
"Wichita, KS (USWIC)",
"Wishram, WA (USWIH)",
"Wilmington, DE (USWIL)",
"Winona, MN (USWIN)",
"Winter Park/Fraser, CO (USWIP)",
"Wisconsin Rapids, WI (USWIR)",
"Wittenberg, WI (USWIT)",
"Wilkes-Barre, PA (USWKB)",
"Wilson, NC (USWLN)",
"Winslow, AZ (USWLO)",
"Westerly, RI (USWLY)",
"Williams, AZ (USWMA)",
"Williams Junction, AZ (USWMJ)",
"Wilmington, NC (USWMN)",
"Windsor, CT (USWND)",
"Windsor Locks, CT (USWNL)",
"Windsor, VT (USWNM)",
"Winnemucca, NV (USWNN)",
"Walnut Ridge, AR (USWNR)",
"Winston-Salem, NC (USWNS)",
"Warrenton, OR (USWNT)",
"Woburn, MA (USWOB)",
"Worcester, MA (USWOR)",
"West Palm Beach, FL (USWPB)",
"Winter Park, FL (USWPK)",
"Waupun, WI (USWPN)",
"Winter Park (Resort), CO (USWPR)",
"Wolf Point, MT (USWPT)",
"White River Junction, VT (USWRJ)",
"Westfield, WI (USWSF)",
"Wausau (Transit Center), WI (USWSJ)",
"Westport, NY (USWSP)",
"White Sulphur Springs, WV (USWSS)",
"Wiscasset, ME (USWST)",
"Wausau-Rothschild (Lamer Bus), WI (USWSU)",
"Winter Haven, FL (USWTH)",
"Waterloo, IN (USWTI)",
"Williston, ND (USWTN)",
"Willits, CA (USWTS)",
"Walla Walla, WA (USWWA)",
"Wildwood, FL (USWWD)",
"Yazoo City, MS (USYAZ)",
"Yemassee, SC (USYEM)",
"Yonkers, NY (USYNY)",
"Yosemite - The Majestic Hotel, CA (USYOA)",
"Yosemite - Half Dome Village, CA (USYOC)",
"Yosemite - Crane Flat, CA (USYOF)",
"Yosemite - Big Trees Lodge, CA (USYOH)",
"Yosemite - Yosemite Valley Lodge, CA (USYOS)",
"Yosemite - Tuolumne Meadow, CA (USYOT)",
"Yosemite - Visitor Center, CA (USYOV)",
"Yosemite - White Wolf, CA (USYOW)",
"Yuma, AZ (USYUM)"
    ];