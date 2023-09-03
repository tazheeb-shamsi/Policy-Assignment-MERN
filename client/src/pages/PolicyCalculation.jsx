import { useState } from "react";
import { useNavigate } from "react-router-dom";

function PolicyCalculation() {
  const navigate = useNavigate();

  const [dob, setDOB] = useState("");
  const [age, setAge] = useState(null);
  const [gender, setGender] = useState("");
  const [sumAssured, setSumAssured] = useState("");
  const [modalPremium, setModalPremium] = useState("");
  const [premiumFrequency, setPremiumFrequency] = useState("");
  const [policyPremiumTerm, setPolicyPremiumTerm] = useState("");
  const [policyTerm, setPolicyTerm] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  const saveDataToLocalStorage = () => {
    const dataToSave = {
      dob,
      gender,
      sumAssured,
      modalPremium,
      premiumFrequency,
      policyPremiumTerm,
      policyTerm,
    };
    localStorage.setItem("policyUserData", JSON.stringify(dataToSave));
  };

  const calculateAge = () => {
    const today = new Date();
    const dobParts = dob.split("-");
    const dobDate = new Date(dobParts[2], dobParts[1] - 1, dobParts[0]);
    const ageInMilliseconds = today - dobDate;

    const ageInYears = Math.floor(
      ageInMilliseconds / (365.25 * 24 * 60 * 60 * 1000)
    );

    setAge(ageInYears);
  };

  const validateInputs = () => {
    const errors = {};

    if (!dob) {
      errors.dob = "Date of Birth is required";
    } else {
      const age = calculateAge(dob);
      if (age < 23 || age > 56) {
        errors.dob = "Age must be between 23 and 56";
      }
    }

    if (!gender) {
      errors.gender = "Gender is required";
    }

    if (!sumAssured) {
      errors.sumAssured = "Sum Assured is required";
    }
    if (!modalPremium) {
      errors.modalPremium = "Modal Premium is required";
    }

    if (!premiumFrequency) {
      errors.premiumFrequency = "Premium Frequency is required";
    }

    if (!policyTerm) {
      errors.policyTerm = "Policy Term is required";
    } else if (policyTerm < 10 || policyTerm > 20) {
      errors.policyTerm = "Policy Term must be between 5 and 10";
    }
    if (!policyPremiumTerm) {
      errors.policyPremiumTerm = "Policy Premium Term is required";
    } else if (policyPremiumTerm < 10 || policyPremiumTerm > 20) {
      errors.policyPremiumTerm = "Policy Term must be between 10 and 20";
    }

    setValidationErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const calculateBenefits = async () => {
    if (!validateInputs()) {
      console.log("Invalid inputs. Please check the values.");
      return;
    }
    saveDataToLocalStorage();
    navigate("/illustration");
  };

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-rose-200/40  ring-2 ring-purple-600 lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-purple-700 underline uppercase decoration-wavy">
          Policy Calculator
        </h1>
        <form className="mt-6">
          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-800">
              Date of Birth
            </label>
            <input
              type="text"
              value={dob}
              onChange={(e) => setDOB(e.target.value)}
              placeholder="dd-mm-yyyy"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
            {validationErrors.dob && (
              <p className="text-red-500">{validationErrors.dob}</p>
            )}
            {age !== null && (
              <p className="text-gray-600 mt-1">You are {age} years old.</p>
            )}
          </div>

          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-800">
              Gender
            </label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            {validationErrors.gender && (
              <p className="text-red-500">{validationErrors.gender}</p>
            )}
          </div>

          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-800">
              Sum Assured
            </label>
            <input
              type="text"
              value={sumAssured}
              onChange={(e) => setSumAssured(e.target.value)}
              placeholder="Enter amount to invest"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
            {validationErrors.sumAssured && (
              <p className="text-red-500">{validationErrors.sumAssured}</p>
            )}
          </div>

          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-800">
              Modal Premium
            </label>
            <input
              type="text"
              value={modalPremium}
              onChange={(e) => setModalPremium(e.target.value)}
              placeholder="Enter amount to invest"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
            {validationErrors.sumAssured && (
              <p className="text-red-500">{validationErrors.sumAssured}</p>
            )}
          </div>

          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-800">
              Premium Frequency
            </label>
            <select
              value={premiumFrequency}
              onChange={(e) => setPremiumFrequency(e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            >
              <option value="">Select Premium Frequency</option>
              <option value="Monthly">Monthly</option>
              <option value="Half-Yearly">Half-Yearly</option>
              <option value="Yearly">Yearly</option>
            </select>
            {validationErrors.premiumFrequency && (
              <p className="text-red-500">
                {validationErrors.premiumFrequency}
              </p>
            )}
          </div>

          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-800">
              Policy Premium Term (PPT)
            </label>
            <input
              type="number"
              value={policyPremiumTerm}
              onChange={(e) => setPolicyPremiumTerm(e.target.value)}
              placeholder="Enter Between 5 and 10 years"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
            {validationErrors.policyPremiumTerm && (
              <p className="text-red-500">
                {validationErrors.policyPremiumTerm}
              </p>
            )}
          </div>
          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-800">
              Policy Term (PT)
            </label>
            <input
              type="number"
              value={policyTerm}
              onChange={(e) => setPolicyTerm(e.target.value)}
              placeholder="Enter Between 10 and 20 years"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
            {validationErrors.policyTerm && (
              <p className="text-red-500">{validationErrors.policyTerm}</p>
            )}
          </div>

          <div className="mt-10">
            <button
              type="button"
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
              onClick={calculateBenefits}
              disabled={Object.keys(validationErrors).length > 0}
            >
              Calculate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PolicyCalculation;
