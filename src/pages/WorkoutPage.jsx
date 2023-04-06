import Virabhadrasana from "../components/Motion/Virabhadrasana";
import React, { useState } from "react";
import "./Page.css";
import { Button, Select, MenuItem } from "@mui/material";
import FormControl from "@mui/material/FormControl";

const styles = {
    back: {
        position: "absolute",
        marginRight: "auto",
        marginLeft: "auto",
        left: 1700,
        right: 0,
        top: 850,
    },
    selectBox: {
        position: "absolute",
        marginRight: "auto",
        marginLeft: "auto",
        left: 1000,
        right: 0,
        top: 200,
        textAlign: "center",
        width: 300,
        height: 30,
    },
};

function WorkoutPage() {
    const [yoga, setYoga] = useState("virabhadrasana");

    function selectYoga() {
        if (yoga === "virabhadrasana") {
            return <Virabhadrasana />;
        } else if (yoga === "trikonasana") {
            return <div>TRi</div>;
        }
        return null;
    }

    return (
        <div>
            <div style={styles.selectBox}>
                <FormControl variant="outlined" size="large" style={{ minWidth: 300 }}>
                    <Select
                        value={yoga}
                        onChange={(event) => {
                            const selectedYoga = event.target.value;
                            setYoga(selectedYoga);
                        }}
                    >
                        <MenuItem value="" disabled>
                            Select Yoga Pose
                        </MenuItem>
                        <MenuItem value="virabhadrasana">Virabhadrasana</MenuItem>
                        <MenuItem value="trikonasana">Trikonasana</MenuItem>
                    </Select>
                </FormControl>
            </div>

            {selectYoga()}
        </div>
    );
}

export default WorkoutPage;
