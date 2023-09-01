import { useEffect, useState } from "react";

const bonusRate = [
  2.5, 3, 3.5, 3.5, 3.5, 3.5, 3, 3, 3, 3, 3, 2.5, 3, 3, 2.5, 5, 4, 4.5, 4, 25,
];

const Illustration = () => {
  const [illustrationArray, setIllustrationArray] = useState([{}]);

  const retrieveDataFromLocalStorage = () => {
    const savedData = localStorage.getItem("policyUserData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setIllustrationArray(parsedData);
    }
  };
  useEffect(() => {
    retrieveDataFromLocalStorage();
  }, []);
  const PolicyYears = Array.from({ length: 20 }, (_, index) => index + 1);

  return (
    <div className="container p-2 mx-auto rounded-md sm:p-4 dark:text-gray-100 dark:bg-gray-900">
      <h2 className="mb-3 text-2xl font-semibold leadi">Illustration</h2>
      <div className="overflow-x-auto">
        <table
          className="min-w-full text-xs table-bordered p-4"
          style={{ border: "2px solid black" }}
        >
          <thead className="rounded-t-lg dark:bg-gray-700 ">
            <tr className="text-right">
              <th title="Ranking" className="p-3 text-center">
                Policy Year
              </th>
              <th title="Team name" className="p-3 text-center">
                Premium
              </th>
              <th title="Wins" className="p-3 text-center">
                Sum Assured
              </th>
              <th title="Losses" className="p-3 text-center">
                Bonus Rate
              </th>
              <th title="Win percentage" className="p-3 text-center">
                Bonus Amount
              </th>
              <th title="Games behind" className="p-3 text-center">
                Total Benefit
              </th>
              <th title="Home games" className="p-3 text-center">
                Net Cashflows
              </th>
            </tr>
          </thead>

          <tbody>
            {PolicyYears.map((year, index) => (
              <tr
                key={index}
                className="text-center border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-800"
              >
                <td className="px-3 py-2">
                  <span>{year}</span>
                </td>
                <td className="px-3 py-2">
                  <span>
                    {/* Premium */}
                    {year <= illustrationArray.policyPremiumTerm
                      ? illustrationArray?.modalPremium
                      : 0}
                  </span>
                </td>
                <td className="px-3 py-2 ">
                  <span>
                    {/* Sum Assured */}
                    {year == illustrationArray.policyTerm
                      ? illustrationArray.sumAssured
                      : 0}
                  </span>
                </td>
                <td className="px-3 py-2">
                  <span>{bonusRate[index]}%</span>
                </td>
                <td className="px-3 py-2">
                  <span>
                    {/* Bonus Amount */}
                    {bonusRate[index] *
                      Math.floor(illustrationArray.sumAssured) *
                      0.01}
                  </span>
                </td>
                <td className="px-3 py-2">
                  <span>
                    {/* Total Benefit */}
                    {year == illustrationArray.policyTerm
                      ? Math.floor(illustrationArray.sumAssured) +
                        bonusRate[index] *
                          Math.floor(illustrationArray.sumAssured) *
                          0.01
                      : 0}
                  </span>
                </td>
                <td className="px-3 py-2">
                  <span>
                    {/* Net Cashflows */}
                    {year === 18
                      ? Math.floor(illustrationArray.sumAssured) +
                        bonusRate[index] *
                          Math.floor(illustrationArray.sumAssured) *
                          0.01
                      : illustrationArray.sumAssured -
                        illustrationArray?.modalPremium}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Illustration;
