import { useState } from "react";
import { Formik, Form } from "formik";
import axios from "axios";
import QRCode from "qrcode.react";
import FormInput from "@/components/Atoms/FormInput";
import { Box, Button, VStack } from "@chakra-ui/react";

const initialValues = {
  question: "who is the current president of america",
  answer: "",
};

const FormScore = () => {
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [qrCodeValue, setQrCodeValue] = useState("");

  const onSubmit = async (values: any) => {
    try {
      const response = await axios.post("/api/chat", values);
      setAnswer(response.data.answer);
      setScore(response.data.score);
      setQrCodeValue(
        `Answer: ${response.data.answer}, Score: ${response.data.score}`
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box mt="2rem" ml="3rem" w="60%">
      <VStack spacing={4} align="stretch">
        <Box>
          <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {({ isSubmitting }) => (
              <Form>
                <FormInput
                  id="question"
                  name="question"
                  label="Question"
                  placeholder="who is the current president of america"
                  isReadOnly
                />
                <br />
                <FormInput id="answer" name="answer" label="Answer" />
                <Button mt="1rem" type="submit" disabled={isSubmitting}>
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
        <Box mt="2rem">
          <p>Answer: {answer}</p>
          <p>Score: {score}</p>
          {answer && <QRCode value={qrCodeValue} />}
        </Box>
      </VStack>
    </Box>
  );
};

export default FormScore;
