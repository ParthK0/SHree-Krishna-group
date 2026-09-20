// Complete Indian Cities & States database for Quick Route Dispatch
// Organized by state/UT with major cities

export interface StateData {
  state: string;
  cities: string[];
}

export const INDIAN_STATES_CITIES: StateData[] = [
  {
    state: 'Rajasthan',
    cities: [
      'Jaipur', 'Jodhpur', 'Udaipur', 'Kota', 'Ajmer', 'Bikaner', 'Bhilwara',
      'Alwar', 'Bhiwadi', 'Sikar', 'Pali', 'Tonk', 'Kishangarh', 'Beawar',
      'Sri Ganganagar', 'Hanumangarh', 'Jhunjhunu', 'Churu', 'Nagaur',
      'Barmer', 'Jaisalmer', 'Chittorgarh', 'Bundi', 'Jhalawar', 'Banswara',
      'Dungarpur', 'Pratapgarh', 'Rajsamand', 'Karauli', 'Sawai Madhopur',
      'Dausa', 'Dholpur', 'Baran', 'Sirohi', 'Jalore', 'Mount Abu',
      'Neemrana', 'Bhiwadi', 'Behror', 'Makrana', 'Falna', 'Nathdwara',
    ],
  },
  {
    state: 'Delhi',
    cities: [
      'New Delhi', 'Delhi NCR', 'Dwarka', 'Rohini', 'Saket', 'Narela',
      'Shahdara', 'Karol Bagh', 'Chandni Chowk', 'Okhla', 'Mayur Vihar',
      'Lajpat Nagar', 'Rajouri Garden', 'Pitampura', 'Janakpuri',
    ],
  },
  {
    state: 'Haryana',
    cities: [
      'Gurugram', 'Faridabad', 'Panipat', 'Ambala', 'Karnal', 'Sonipat',
      'Hisar', 'Rohtak', 'Yamunanagar', 'Panchkula', 'Bhiwani', 'Sirsa',
      'Bahadurgarh', 'Jind', 'Thanesar', 'Kaithal', 'Palwal', 'Rewari',
      'Hansi', 'Narnaul', 'Fatehabad', 'Mahendragarh', 'Manesar',
      'Dharuhera', 'Kundli', 'Rai', 'Sohna', 'Pataudi',
    ],
  },
  {
    state: 'Uttar Pradesh',
    cities: [
      'Noida', 'Greater Noida', 'Ghaziabad', 'Lucknow', 'Kanpur', 'Agra',
      'Varanasi', 'Meerut', 'Prayagraj (Allahabad)', 'Bareilly', 'Aligarh',
      'Moradabad', 'Saharanpur', 'Gorakhpur', 'Firozabad', 'Jhansi',
      'Muzaffarnagar', 'Mathura', 'Rampur', 'Shahjahanpur', 'Farrukhabad',
      'Mau', 'Hapur', 'Etawah', 'Mirzapur', 'Bulandshahr', 'Sambhal',
      'Amroha', 'Hardoi', 'Fatehpur', 'Raebareli', 'Orai', 'Unnao',
      'Lakhimpur Kheri', 'Sitapur', 'Sultanpur', 'Azamgarh', 'Deoria',
      'Basti', 'Gonda', 'Bahraich', 'Barabanki', 'Faizabad', 'Banda',
      'Mainpuri', 'Hathras', 'Budaun', 'Auraiya', 'Ballia', 'Bijnor',
    ],
  },
  {
    state: 'Maharashtra',
    cities: [
      'Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Aurangabad (Sambhajinagar)',
      'Thane', 'Navi Mumbai', 'Solapur', 'Kolhapur', 'Amravati', 'Akola',
      'Latur', 'Dhule', 'Ahmednagar', 'Jalgaon', 'Chandrapur', 'Parbhani',
      'Ichalkaranji', 'Jalna', 'Ratnagiri', 'Sangli', 'Satara', 'Wardha',
      'Osmanabad', 'Nanded', 'Yavatmal', 'Beed', 'Gondia', 'Hingoli',
      'Washim', 'Buldhana', 'Bhiwandi', 'Panvel', 'Vasai-Virar',
      'Kalyan-Dombivli', 'Mira-Bhayandar', 'Ulhasnagar', 'JNPT / Nhava Sheva',
      'Taloja', 'Chakan', 'Ranjangaon', 'Talegaon', 'Pimpri-Chinchwad',
    ],
  },
  {
    state: 'Gujarat',
    cities: [
      'Ahmedabad', 'Surat', 'Vadodara (Baroda)', 'Rajkot', 'Bhavnagar',
      'Jamnagar', 'Junagadh', 'Gandhinagar', 'Gandhidham', 'Anand', 'Nadiad',
      'Morbi', 'Mehsana', 'Bharuch', 'Vapi', 'Navsari', 'Veraval', 'Porbandar',
      'Godhra', 'Patan', 'Dahod', 'Botad', 'Amreli', 'Deesa', 'Jetpur',
      'Palanpur', 'Valsad', 'Ankleshwar', 'Mundra', 'Hazira', 'Kandla',
      'Kutch', 'Surendranagar', 'Bhuj', 'Silvassa', 'Daman',
    ],
  },
  {
    state: 'Madhya Pradesh',
    cities: [
      'Indore', 'Bhopal', 'Jabalpur', 'Gwalior', 'Ujjain', 'Sagar', 'Dewas',
      'Satna', 'Ratlam', 'Rewa', 'Murwara (Katni)', 'Singrauli', 'Burhanpur',
      'Khandwa', 'Bhind', 'Chhindwara', 'Guna', 'Shivpuri', 'Vidisha',
      'Chhatarpur', 'Damoh', 'Mandsaur', 'Khargone', 'Neemuch', 'Pithampur',
      'Hoshangabad', 'Itarsi', 'Sehore', 'Betul', 'Seoni', 'Datia',
      'Nagda', 'Mandideep',
    ],
  },
  {
    state: 'Karnataka',
    cities: [
      'Bengaluru', 'Mysuru (Mysore)', 'Hubli-Dharwad', 'Mangaluru', 'Belgaum (Belagavi)',
      'Gulbarga (Kalaburagi)', 'Davanagere', 'Bellary', 'Bijapur', 'Shimoga',
      'Tumkur', 'Raichur', 'Bidar', 'Hospet', 'Hassan', 'Robertson Pet',
      'Gadag-Betageri', 'Mandya', 'Udupi', 'Chikmagalur', 'Karwar',
      'Ranebennur', 'Chitradurga', 'Kolar', 'Bagalkot', 'Gangavathi',
      'Peenya', 'Whitefield', 'Electronic City', 'Bommasandra', 'Nelamangala',
    ],
  },
  {
    state: 'Tamil Nadu',
    cities: [
      'Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli (Trichy)', 'Salem',
      'Tirunelveli', 'Tiruppur', 'Erode', 'Vellore', 'Thoothukudi (Tuticorin)',
      'Dindigul', 'Thanjavur', 'Ranipet', 'Sivakasi', 'Karur', 'Hosur',
      'Nagercoil', 'Kanchipuram', 'Kumbakonam', 'Rajapalayam', 'Pudukkottai',
      'Ambur', 'Pollachi', 'Neyveli', 'Cuddalore', 'Ooty', 'Krishnagiri',
      'Sriperumbudur', 'Maraimalai Nagar', 'Ennore Port',
    ],
  },
  {
    state: 'Telangana',
    cities: [
      'Hyderabad', 'Warangal', 'Nizamabad', 'Karimnagar', 'Khammam',
      'Mahbubnagar', 'Ramagundam', 'Nalgonda', 'Adilabad', 'Suryapet',
      'Miryalaguda', 'Jagtial', 'Mancherial', 'Siddipet', 'Medak',
      'Shamshabad', 'Patancheru', 'Jeedimetla', 'Bollaram',
    ],
  },
  {
    state: 'Andhra Pradesh',
    cities: [
      'Visakhapatnam (Vizag)', 'Vijayawada', 'Guntur', 'Nellore', 'Kurnool',
      'Tirupati', 'Rajahmundry', 'Kadapa', 'Kakinada', 'Anantapur',
      'Eluru', 'Ongole', 'Srikakulam', 'Vizianagaram', 'Tenali',
      'Proddatur', 'Chittoor', 'Hindupur', 'Machilipatnam', 'Amaravati',
      'Nandyal', 'Adoni', 'Tadepalligudem', 'Bhimavaram',
    ],
  },
  {
    state: 'West Bengal',
    cities: [
      'Kolkata', 'Howrah', 'Durgapur', 'Asansol', 'Siliguri', 'Bardhaman',
      'Malda', 'Baharampur', 'Habra', 'Kharagpur', 'Shantipur', 'Barasat',
      'Raiganj', 'Haldia', 'Kalyani', 'Krishnanagar', 'Raniganj',
      'Balurghat', 'Jalpaiguri', 'Cooch Behar', 'Darjeeling', 'Alipurduar',
      'Bankura', 'Midnapore', 'Tamluk', 'Diamond Harbour', 'Bally',
    ],
  },
  {
    state: 'Punjab',
    cities: [
      'Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala', 'Bathinda', 'Mohali',
      'Pathankot', 'Hoshiarpur', 'Batala', 'Moga', 'Abohar', 'Malerkotla',
      'Khanna', 'Phagwara', 'Muktsar', 'Rajpura', 'Barnala', 'Firozpur',
      'Kapurthala', 'Faridkot', 'Sangrur', 'Nawanshahr', 'Mandi Gobindgarh',
      'Dera Bassi', 'Gobindgarh', 'Zirakpur',
    ],
  },
  {
    state: 'Kerala',
    cities: [
      'Thiruvananthapuram', 'Kochi (Cochin)', 'Kozhikode (Calicut)', 'Thrissur',
      'Kollam', 'Palakkad', 'Alappuzha', 'Kannur', 'Kottayam', 'Malappuram',
      'Thalassery', 'Kasaragod', 'Attingal', 'Kayamkulam', 'Punalur',
      'Perinthalmanna', 'Manjeri', 'Tirur', 'Changanassery', 'Cochin Port',
    ],
  },
  {
    state: 'Bihar',
    cities: [
      'Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur', 'Purnia', 'Darbhanga',
      'Bihar Sharif', 'Arrah', 'Begusarai', 'Katihar', 'Munger', 'Chapra',
      'Sasaram', 'Hajipur', 'Dehri', 'Siwan', 'Motihari', 'Nawada',
      'Bettiah', 'Saharsa', 'Forbesganj', 'Buxar', 'Jehanabad', 'Aurangabad',
    ],
  },
  {
    state: 'Odisha',
    cities: [
      'Bhubaneswar', 'Cuttack', 'Rourkela', 'Berhampur (Brahmapur)', 'Sambalpur',
      'Puri', 'Balasore', 'Baripada', 'Bhadrak', 'Jharsuguda', 'Jeypore',
      'Bargarh', 'Paradip', 'Angul', 'Dhenkanal', 'Kendujhar (Keonjhar)',
      'Koraput', 'Rayagada', 'Kalinganagar',
    ],
  },
  {
    state: 'Jharkhand',
    cities: [
      'Ranchi', 'Jamshedpur', 'Dhanbad', 'Bokaro Steel City', 'Deoghar',
      'Hazaribagh', 'Giridih', 'Ramgarh', 'Medininagar (Daltonganj)',
      'Phusro', 'Dumka', 'Chaibasa', 'Adityapur', 'Sindri', 'Chirkunda',
    ],
  },
  {
    state: 'Chhattisgarh',
    cities: [
      'Raipur', 'Bhilai', 'Bilaspur', 'Korba', 'Durg', 'Rajnandgaon',
      'Jagdalpur', 'Raigarh', 'Ambikapur', 'Dhamtari', 'Mahasamund',
      'Chirmiri', 'Dongargarh', 'Bhatapara',
    ],
  },
  {
    state: 'Assam',
    cities: [
      'Guwahati', 'Silchar', 'Dibrugarh', 'Jorhat', 'Nagaon', 'Tinsukia',
      'Tezpur', 'Bongaigaon', 'Karimganj', 'North Lakhimpur', 'Dhubri',
      'Goalpara', 'Diphu', 'Sivasagar', 'Golaghat',
    ],
  },
  {
    state: 'Uttarakhand',
    cities: [
      'Dehradun', 'Haridwar', 'Roorkee', 'Haldwani', 'Rudrapur', 'Kashipur',
      'Rishikesh', 'Pithoragarh', 'Nainital', 'Mussoorie', 'Pantnagar',
      'Ramnagar', 'Kotdwar', 'Almora', 'Bazpur', 'Selaqui', 'Sitarganj',
    ],
  },
  {
    state: 'Himachal Pradesh',
    cities: [
      'Shimla', 'Solan', 'Dharamshala', 'Mandi', 'Palampur', 'Baddi',
      'Nahan', 'Hamirpur', 'Una', 'Kullu', 'Manali', 'Bilaspur',
      'Chamba', 'Parwanoo', 'Kala Amb',
    ],
  },
  {
    state: 'Jammu & Kashmir',
    cities: [
      'Srinagar', 'Jammu', 'Anantnag', 'Baramulla', 'Sopore', 'Kathua',
      'Udhampur', 'Rajouri', 'Poonch', 'Pulwama', 'Kupwara',
    ],
  },
  {
    state: 'Goa',
    cities: [
      'Panaji', 'Margao (Madgaon)', 'Vasco da Gama', 'Mapusa', 'Ponda',
      'Bicholim', 'Curchorem', 'Sanquelim', 'Cuncolim', 'Mormugao Port',
    ],
  },
  {
    state: 'Tripura',
    cities: [
      'Agartala', 'Udaipur', 'Dharmanagar', 'Kailashahar', 'Belonia',
      'Ambassa', 'Khowai', 'Sonamura',
    ],
  },
  {
    state: 'Meghalaya',
    cities: [
      'Shillong', 'Tura', 'Jowai', 'Nongstoin', 'Williamnagar', 'Baghmara',
    ],
  },
  {
    state: 'Manipur',
    cities: [
      'Imphal', 'Thoubal', 'Bishnupur', 'Churachandpur', 'Ukhrul', 'Kakching',
    ],
  },
  {
    state: 'Nagaland',
    cities: [
      'Kohima', 'Dimapur', 'Mokokchung', 'Tuensang', 'Wokha', 'Zunheboto',
    ],
  },
  {
    state: 'Mizoram',
    cities: [
      'Aizawl', 'Lunglei', 'Champhai', 'Serchhip', 'Kolasib', 'Lawngtlai',
    ],
  },
  {
    state: 'Arunachal Pradesh',
    cities: [
      'Itanagar', 'Naharlagun', 'Pasighat', 'Tawang', 'Ziro', 'Bomdila',
      'Along', 'Tezu', 'Roing',
    ],
  },
  {
    state: 'Sikkim',
    cities: [
      'Gangtok', 'Namchi', 'Gyalshing', 'Mangan', 'Rangpo', 'Singtam',
    ],
  },
  {
    state: 'Chandigarh',
    cities: ['Chandigarh'],
  },
  {
    state: 'Puducherry',
    cities: ['Puducherry (Pondicherry)', 'Karaikal', 'Mahe', 'Yanam'],
  },
  {
    state: 'Ladakh',
    cities: ['Leh', 'Kargil'],
  },
  {
    state: 'Andaman & Nicobar Islands',
    cities: ['Port Blair', 'Car Nicobar'],
  },
  {
    state: 'Dadra & Nagar Haveli and Daman & Diu',
    cities: ['Silvassa', 'Daman', 'Diu'],
  },
  {
    state: 'Lakshadweep',
    cities: ['Kavaratti', 'Agatti'],
  },
];

/**
 * Returns a flat array of "City, State" strings for use in dropdowns.
 */
export function getAllCityOptions(): string[] {
  const options: string[] = [];
  for (const s of INDIAN_STATES_CITIES) {
    for (const city of s.cities) {
      options.push(`${city}, ${s.state}`);
    }
  }
  return options;
}

/**
 * Returns grouped options for <optgroup> rendering.
 */
export function getCitiesGroupedByState(): { state: string; cities: string[] }[] {
  return INDIAN_STATES_CITIES.map((s) => ({
    state: s.state,
    cities: s.cities,
  }));
}
