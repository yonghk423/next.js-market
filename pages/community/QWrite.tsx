import type { NextPage } from "next";
import styled from "styled-components"

const QWrite: NextPage = () => {
  return (
    <form>
      <textarea        
        rows={4}
        placeholder="Ask a question!"
      />
      <button>
        Submit
      </button>
    </form>
  );
};

export default QWrite;