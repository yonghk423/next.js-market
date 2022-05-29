import type { NextPage } from "next";
import styled from "styled-components"

const Svg = styled.svg`
width: 25px;
height: 25px;
`;

const EditProfile: NextPage = () => {
  return (
    <div>
      <div>
        <div/>
        <label
          htmlFor="picture"
        >
          Change
          <input id="picture" type="file" className="hidden" accept="image/*" />
        </label>
      </div>
      <div className="space-y-1">
        <label htmlFor="email">
          Email address
        </label>
        <input
          id="email"
          type="email"
          required
        />
      </div>
      <div className="space-y-1">
        <label htmlFor="phone">
          Phone number
        </label>
        <div className="flex rounded-md shadow-sm">
          <span>
            +82
          </span>
          <input
            id="input"
            type="number"
            required
          />
        </div>
      </div>
      <button >
        Update profile
      </button>
    </div>
  );
};

export default EditProfile;