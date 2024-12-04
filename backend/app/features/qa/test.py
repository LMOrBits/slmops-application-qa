from langchain_core.tools import tool
from langchain_openai import ChatOpenAI

llm = ChatOpenAI(model="gpt-4o-mini")

@tool
def calculator(operation: str, number1: float, number2: float) -> str:
    """Perform basic math calculations.
    
    Args:
        operation: The type of operation to execute (add, subtract, multiply, divide)
        number1: The first number to operate on
        number2: The second number to operate on
    """
    if operation == "add":
        return str(number1 + number2)
    elif operation == "subtract":
        return str(number1 - number2)
    elif operation == "multiply":
        return str(number1 * number2)
    elif operation == "divide":
        if number2 == 0:
            return "Error: Cannot divide by zero"
        return str(number1 / number2)
    else:
        return "Error: Invalid operation. Please use add, subtract, multiply, or divide."