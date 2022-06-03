import type { NextPage } from "next";
import styled from "styled-components"

const Svg = styled.svg`
width: 250px;
height: 250px;
`;

const FileInput = styled.input`
  display: none;
`;

interface UploadProduct {
  name:string;
  price:number;
  description:string;
}

const onDataChange = (e:any) => {

}

const Upload: NextPage = () => {
  return (
    <div>
      <div>
        <div>
          <label>
            <Svg
              className="h-12 w-12"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
            <FileInput type="file" />
          </label>
        </div>
      </div>
      <form>
        <div>
          <div onChange={onDataChange}>Name</div>
          <input type="text"></input>
        </div>
        <div>
          <div>Price</div>
          <div>
            <div>
              <div>$</div>
            </div>
            <input type="text" placeholder="0.00" />
            <div>
              <div>USD</div>
            </div>
          </div>
        </div>
        <div>
          <div>Description</div>
          <div>
            <textarea rows={4} />
          </div>
        </div>
        <button>Upload product</button>
      </form>
    </div>
    
  );
};

export default Upload;