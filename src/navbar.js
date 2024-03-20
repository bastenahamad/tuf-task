import React from "react";
import { useState, useCallback } from "react";
import Textarea from "./TextArea";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {useId} from "react-id-generator";

function Navbar() {
  const [nextId] = useId();
  const [code, setCode] = useState("");
  const [lang, setLang] = useState("");
  const [input, setInput] = useState("");
  const [name, setName] = useState("");
  
  const navigate = useNavigate();


  const c = useCallback((e) => {
    e.preventDefault();
    setLang("C++");
  }, []);

  const py = useCallback((e) => {
    e.preventDefault();
    setLang("Python");
  }, []);

  const java = useCallback((e) => {
    e.preventDefault();
    setLang("Java");
  }, []);

  const js = useCallback((e) => {
    e.preventDefault();
    setLang("Javascript");
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    try{
      await axios.post("https://tuf-task-d8nf.onrender.com/create", {
        id: nextId,
        username: name,
        lang: lang,
        code: code,
        stdin: input,
      });
      navigate("/submission");
    } catch(err) {
      console.log(err);
    }
  }
  return (
    <div>
      <form>
        <div className="navbar">
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {!lang ? "Language" : lang}
            </button>
            <ul className="dropdown-menu">
              <li>
                <button className="dropdown-item" onClick={c}>
                  C++
                </button>
              </li>
              <li>
                <button className="dropdown-item" onClick={py}>
                  Python
                </button>
              </li>
              <li>
                <button className="dropdown-item" onClick={java}>
                  Java
                </button>
              </li>
              <li>
                <button className="dropdown-item" onClick={js}>
                  Javascript
                </button>
              </li>
            </ul>
          </div>
          <div class="col-auto">
            <div class="input-group">
              <div class="input-group-text">@</div>
              <input
                type="text"
                class="form-control"
                id="autoSizingInputGroup"
                placeholder="Enter Username"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
          </div>
          <div>
            <button type="submit" className="btn btn-success" onClick={submit}>
              <i class="fa-solid fa-cloud-arrow-up"></i> Submit
            </button>
          </div>
        </div>
        <div className="code-text row">
          <div className="col-7">
            <h1>{"<Codegram />"}</h1>
            <p>Sumbit & Showoff your coding skills...</p>
            <Textarea
              name="test-textarea"
              value={code}
              onValueChange={(value) => setCode(value)}
              numOfLines={1}
            />
          </div>
          <div className="col-5 left-div">
            <div>
              <h2>Input</h2>
              <textarea
                placeholder="Custom input"
                className="stdio"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              ></textarea>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
export default Navbar;