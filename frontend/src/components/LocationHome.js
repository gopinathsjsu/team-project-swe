import React, { useState } from 'react';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
const LocationHome = () => {
    const [location, SetLocation] = useState('')
    const handleChange = (event) => {
        SetLocation(event.target.value)

    }
    const locations = [
        {
            locationName: "San Jose",
            value: "san jose"
        },
        {
            locationName: "Pleasanton",
            value: "pleasanton"
        },
        {
            locationName: "San Ramon",
            value: "san ramon"
        },
        {
            locationName: "Oakland",
            value: "oakland"
        },
        {
            locationName: "Dallas",
            value: "dallas"
        },
        {
            locationName: "Maryland",
            value: "maryland"
        }
    ]
    return (
        <div className='bg-[#fff] flex justify-between px-[30px] my-[10px]'>
            <FormControl sx={{ m: 1, minWidth: 250 }} size="small">
                <InputLabel id="demo-select-small-label">Location</InputLabel>
                <Select

                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={location}
                    label="Location"
                    onChange={handleChange}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {locations.map((data) => <MenuItem value={data.value}>{data.locationName}</MenuItem>)}
                </Select>
            </FormControl>
            <Paper 
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400,border:'2px solid #A4B0BD' }}
            >

                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search Movie"
                    inputProps={{ 'aria-label': 'search google maps' }}
                />
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon />
                </IconButton>

            </Paper>
        </div>
    )
}

export default LocationHome