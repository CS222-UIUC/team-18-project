import { render, screen, fireEvent } from "@testing-library/react";
import Home from'../src/app/page';
describe("Home component", () => {
  test("renders title and dropdowns", () => {
    render(<Home />);

   //these tests are written for the mocking version where the dropdown has foods in it not classes
    expect(screen.getByText("Dropdown 1")).toBeInTheDocument();
    expect(screen.getByText("Dropdown 2")).toBeInTheDocument();
  });

  test("renders correct options in the dropdowns", () => {
    render(<Home />);

    
    myWords.forEach((word) => {
      expect(screen.getByText(word)).toBeInTheDocument();
    });

    
    myWords2.forEach((word) => {
      expect(screen.getByText(word)).toBeInTheDocument();
    });
  });

  test("dropdown 1 can be interacted with", () => {
    render(<Home />);

    const dropdown1Button = screen.getByText("Dropdown 1");
    fireEvent.click(dropdown1Button);

   
    expect(screen.getByText("Salami")).toBeInTheDocument();
  });

  test("dropdown 2 can be interacted with", () => {
    render(<Home />);


    const dropdown2Button = screen.getByText("Dropdown 2");
    fireEvent.click(dropdown2Button);


    expect(screen.getByText("Hamilton")).toBeInTheDocument();
  });
});
