"use client";
import { useState } from "react";

export default function NewPH() {
    const [temp, setTemp] = useState();
    const [sample, setSample] = useState("");
    const [ph, setPH] = useState();
    const [conduct, setConduct] = useState();
    const [submitted, setSubmitted] = useState(false);

    const [phTest, setPhTest] = useState({
        temperature: undefined,
        sampleId: "",
        phLevel: undefined,
        conductivity: undefined
    })

    const handleSubmit =(event)=>{
        console.log("event");
        event.preventDefault();
        const newTest = {temperature: temp, sampleId: sample, phLevel: ph, conductivity: conduct};
        setPhTest(newTest);
        setSubmitted(true);
        setTemp("");
        setSample("");
        setPH("");
        setConduct("");
    }

    return(
        <div>
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>
                            Temperature
                        </label>
                        <input type="number" value={temp} onChange={(e) => setTemp(e.target.value)}/>
                    </div>
                    <div>
                        <label>
                            Sample ID
                        </label>
                        <input type="text" value={sample} onChange={(e) => setSample(e.target.value)}/>
                    </div>
                    <div>
                        <label>
                            PH
                        </label>
                        <input type="text" value={ph} onChange={(e) => setPH(e.target.value)}/>
                    </div>
                    <div>
                        <label>
                            Conductivity
                        </label>
                        <input type="text" value={conduct} onChange={(e) => setConduct(e.target.value)}/>
                    </div>
                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </form>

                <div>
                    {submitted && (
                        <div>
                            <div>
                                Temperature: {phTest.temperature}
                            </div>
                            <div>
                                Sample ID: {phTest.sampleId}
                            </div>
                            <div>
                                PH: {phTest.phLevel}
                            </div>
                            <div>
                                Conductivity: {phTest.conductivity}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}