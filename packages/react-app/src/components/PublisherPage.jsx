import { Switch } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PublisherCard, ReviewerCard } from "../components";

const PublisherPage = ({ address }) => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState();
  const [checked, setChecked] = useState(false);

  const options = [{ name: "DeFi" }, { name: "DAO" }, { name: "Abstract Art" }, { name: "DeSci" }, { name: "NFT" }];
  const onSelectChange = e => {
    console.log(e.target.value);
    setSelectedOption(e.target.value);
  };

  return (
    <div className="flex flex-col bg-white p-8 pt-12">
      <div className="flex flex-row place-content-between mb-4">
        <div className="flex flex-row">
          <svg width="17" height="12" viewBox="0 0 17 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0.469669 5.46967C0.176777 5.76256 0.176777 6.23744 0.469669 6.53033L5.24264 11.3033C5.53553 11.5962 6.01041 11.5962 6.3033 11.3033C6.59619 11.0104 6.59619 10.5355 6.3033 10.2426L2.06066 6L6.3033 1.75736C6.59619 1.46447 6.59619 0.989593 6.3033 0.696699C6.01041 0.403806 5.53553 0.403806 5.24264 0.696699L0.469669 5.46967ZM17 5.25L1 5.25V6.75L17 6.75V5.25Z"
              fill="black"
            />
          </svg>
          <div className="ml-2 -mt-1 font-bold cursor-pointer" onClick={() => navigate(`/user/submissions`)}>
            Back
          </div>
        </div>
        <div className="flex flex-row space-x-4">
          <div className="flex flex-row">
            <select
              className="block bg-transparent w-full pl-3 pr-3 py-1 text-lg rounded-2xl"
              style={{ border: "1px solid #E6E6E6" }}
              onChange={e => onSelectChange(e)}
            >
              {options.map((item, index) => {
                return <option>{item.name}</option>;
              })}
            </select>
          </div>
          <div className="flex flex-row space-x-1 rounded-full p-px bg-grey">
            <Switch
              onChange={e => {
                setChecked(e);
              }}
              checked={checked}
              className="px-6"
              checkedChildren="Reviewer"
              unCheckedChildren="Publisher"
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {!checked ? (
          <>
            <PublisherCard></PublisherCard>
            <PublisherCard></PublisherCard>
            <PublisherCard></PublisherCard>
            <PublisherCard></PublisherCard>
            <PublisherCard></PublisherCard>
          </>
        ) : (
          <>
            <ReviewerCard></ReviewerCard>
            <ReviewerCard></ReviewerCard>
            <ReviewerCard></ReviewerCard>
          </>
        )}
      </div>
    </div>
  );
};

export default PublisherPage;
