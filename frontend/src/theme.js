import { createContext, useState, useMemo, useEffect } from "react";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material";

const fontFamily = ["'Exo 2'", "sans-serif"].join(",")

export const themeSettings = () => {
    const typography = {
        allVariants: {
            color: 'white',
        },
        fontFamily,
        fontSize: 12,
        h1: {
            fontFamily,
            fontSize: '2.5rem',
        },
        h2: {
            fontFamily,
            fontSize: '2rem',
        },
        h3: {
            fontFamily,
            fontSize: '1.5rem',
        },
        h4: {
            fontFamily,
            fontSize: '1.25rem'
        },
        h5: {
            fontFamily,
            fontSize: '1rem',
        },
        h6: {
            fontFamily,
            fontSize: '0.9rem',
        },
    }
    const theme = createTheme({
        palette: {
            mode: 'dark',
            primary: {
                main: '#cc0000',
            },
            background: {
                default: '#161616',
                paper: '#000000',
            }
        },
        typography,
    })

    return theme;
};