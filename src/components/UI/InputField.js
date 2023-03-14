import { InputAdornment, TextField } from "@mui/material";
import React from "react";

const InputField = ({ className, textColor, Width, iconStart, InputProps, iconEnd, ...props }) => {

    return (
        <div className={`${className}`}>
            <TextField
                sx={{
                    width: `${Width}`, "& .MuiInputBase-root": {
                        color: `${textColor}`
                    }
                }}
                {...props}
                InputProps={{
                    ...InputProps,
                    startAdornment: iconStart ? (
                        <InputAdornment position="start">
                            {iconStart}
                        </InputAdornment>
                    ) : null,
                    endAdornment: iconEnd ? (
                        <InputAdornment position="end">
                            {iconEnd}
                        </InputAdornment>
                    ) : null
                }}
            />
        </div>
    )
};

export default InputField;