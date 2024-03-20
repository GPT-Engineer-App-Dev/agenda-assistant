import {
  VStack,
  HStack,
  Heading,
  IconButton,
  Input,
  useToast,
  StackDivider,
  useColorModeValue,
  Box,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { FaSun, FaMoon, FaTrash, FaPlus } from "react-icons/fa";
import { useState } from "react";

interface Todo {
  id: number;
  text: string;
}

const Index = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState("");
  const toast = useToast();
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue("gray.100", "gray.700");
  const secondaryTextColor = useColorModeValue("gray.600", "gray.400");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value);

  const addTodo = () => {
    if (!inputValue.trim()) {
      toast({
        title: "No content",
        description: "Please enter a todo item.",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    const newTodo: Todo = {
      id: Date.now(),
      text: inputValue,
    };
    setTodos([...todos, newTodo]);
    setInputValue("");
  };

  const deleteTodo = (id: number) => {
    const filteredTodos = todos.filter((todo) => todo.id !== id);
    setTodos(filteredTodos);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  return (
    <VStack p={4}>
      <IconButton
        aria-label="Toggle dark mode"
        icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
        isRound
        size="lg"
        alignSelf="flex-end"
        onClick={toggleColorMode}
      />
      <Heading
        mb="8"
        fontWeight="extrabold"
        size="2xl"
        bgGradient="linear(to-r, pink.500, pink.300, blue.500)"
        bgClip="text"
      >
        Todo Application
      </Heading>
      <HStack w="100%">
        <Input
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Add a new todo..."
          variant="filled"
          mr={2}
        />
        <IconButton
          aria-label="Add todo"
          icon={<FaPlus />}
          onClick={addTodo}
        />
      </HStack>
      <VStack
        divider={<StackDivider />}
        borderColor={secondaryTextColor}
        borderWidth="2px"
        p={4}
        borderRadius="lg"
        w="100%"
        maxW={{ base: "90vw", sm: "80vw", lg: "50vw", xl: "40vw" }}
        alignItems="stretch"
        bg={bg}
      >
        {todos.map((todo) => (
          <HStack key={todo.id}>
            <Text isTruncated>{todo.text}</Text>
            <IconButton
              aria-label="Delete todo"
              icon={<FaTrash />}
              onClick={() => deleteTodo(todo.id)}
            />
          </HStack>
        ))}
      </VStack>
      {todos.length === 0 && (
        <Box mt="4">
          <Text color={secondaryTextColor}>No todos yet. Add some!</Text>
        </Box>
      )}
    </VStack>
  );
};

export default Index;