import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getSubject, updateSubject } from "../../../api/academic";

function SubjectInfo() {
  const { register, handleSubmit } = useForm();
  const [errors, setErrors] = useState([]);
  
  return <div>SubjectInfo</div>;
}

export default SubjectInfo;
