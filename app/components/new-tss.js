"use client";
import { useState } from "react";

export default function NewTSS() {
    const [sample, setSample] = useState("");
    const [tss, setTss] = useState("");
    const [tssTest, setTssTest] = useState({
        sampleID: "",
        tssLevel: ""
    })
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit =(event)=>{
        event.preventDefault();
        const newObj ={sampleID: sample, tssLevel: tss};
        setTssTest(newObj);
        setSubmitted(true);
        setSample("");
        setTss("");
    }

    return(
        <div>
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>
                            Sample ID
                        </label>
                        <input type="text" value={sample} onChange={(e) => setSample(e.target.value)}/>
                    </div>
                    <div>
                        <label>
                            TSS in mg/L
                        </label>
                        <input type="text" value={tss} onChange={(e) => setTss(e.target.value)}/>
                    </div>
                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>

            <div>
                {submitted && (
                    <div>
                        <div>
                            Sample ID: {tssTest.sampleID}
                        </div>
                        <div>
                            TSS: {tssTest.tssLevel}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}