// import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import Slider from '@mui/material/Slider';
// import axios from "axios";
// import FilterProperty from "../views/components/FilterProperty"
// import { getPropertiesList } from "../views/components/urls/urls";


// export default function FilterPropertyController (){
//     const [area , setArea ] = useState('')
//     const [estateType , setEstateType ] = useState('')
//     const [neighborhood , setNeighborhood ] = useState('')
//     const [minPrice , setMinPrice ] = useState('')
//     const [maxPrice , setMaxPrice ] = useState('')
//     const [isSpecial , setIsSpecial ] = useState('')
//     const [ properties , setProperties] = useState([])
//     const [propertiesValues,setPropertiesValues] = useState([])
//     const [value, setValue] = useState([350, 400]);
//     useEffect(() =>{
//         console.log(`===================${params.id}=========================`)
//         const getProperties = async () =>{
//             let result = null
//             if(token !=null){
//                 await axios.get(getPropertiesList + '/' + 1,{ headers: { Accept: 'application/json', Authorization: 'Bearer ' + token } })
//                 .then((res) =>{if(res.status ===200){
//                     console.log('res=====')
//                     console.log(res)
//                     result = res.data.data.properties
//                     setProperties(result)
//                 }
//                 }).catch((err) =>{console.log(err.response)})
//             }
//         }
//         getProperties()
//      }, [])

//     function valueArea(value) {
//         return `${value} %`;
//     }

//     const handleChangeArea = (event, newValue) => {
//         setValue(newValue);
//     };

//     const token = localStorage.getItem('OFTo')
//     let params = useParams()

//     const checkValue = (e)=>{
//         let exists = false
//         for(const item of propertiesValues){
//             if(item.property_id ===  e.target.id){
//                 item.value = e.target.value
//                 exists = true
//             }
//         }
//         if(!exists){
//             propertiesValues.push({property_id:e.target.id,value:e.target.value})
//         }
//         console.log(propertiesValues)
//         setPropertiesValues(propertiesValues)
//     }

//     const filterProperties = (property) =>{
//         switch(property.type){
//             case 'Range':
//                 return    <Slider getAriaLabel={() => 'Temperature range'} value={property.id} onChange={handleChangeArea} valueLabelDisplay="auto"
//                 getAriaValueText={valueArea} min={300} max={600} />
    
//                 case 'Dropdown':
//                     return <div className='col-md-6 pb-4'>
//                   <FormControl fullWidth>
//                   <InputLabel id="demo-simple-select-helper-label">{property.name} </InputLabel>
//                     <Select
//                         onChange={(e) =>{checkValue(e)}}
//                         labelId="demo-simple-select-helper-label"
//                         id="demo-simple-select-helper"
//                         label="new label">
//                             { property.options.map((item) =>
//                               <MenuItem value={item.id}>{item.name} </MenuItem>  )
//                         }
//                     </Select>
//                 </FormControl>
//                 </div>
//             default:
//                 return <div></div>
                

//         }
//     }


//     const Filter = async () =>{
//         let result = null
//         if(token != null){
//             let formDate = null
//             formDate =new FormData()
//             formDate.append('area_id' , area)
//             formDate.append('category_id' , params.id)
//             formDate.append('estate_type_id' , estateType)
//             formDate.append('neighborhood_id' , neighborhood)
//             formDate.append('min_price' , minPrice)
//             formDate.append('max_price' , maxPrice)
//             formDate.append('is_special' , isSpecial)
//         }

//     }
//     return (<FilterProperty filter={filterProperties} />)

// }