import axios, { AxiosResponse } from "axios"

const baseUrl: string = "http://localhost:5000/api/v1/posts"

export const getTodos = async (): Promise<AxiosResponse<ApiDataType>> => {
    try {
      const todos: AxiosResponse<ApiDataType> = await axios.get(
        baseUrl + "/", {headers: {"Content-Type": "application/json"}}
      )
      return todos
    } catch (error: any) {
      throw new Error(error)
    }
  }

export const addTodo = async (
    formData: IPost
  ): Promise<AxiosResponse<ApiDataType>> => {
    try {
      const todo: Omit<IPost, "_id"> = {
        title: formData.title,
        content: formData.content,
        authorEmail: formData.authorEmail,
      }
      const saveTodo: AxiosResponse = await axios.post(
        baseUrl + "/add-todo",
        todo
      )
      return saveTodo
    } catch (error: any) {
      throw new Error(error)
    }
  }

  export const updateTodo = async (
    todo: IPost
  ): Promise<AxiosResponse> => {
    try {
      const todoUpdate: Pick<IPost, "status"> = {
        status: true,
      }
      const updatedTodo: AxiosResponse = await axios.put(
        `${baseUrl}/edit-todo/${todo._id}`,
        todoUpdate
      )
      return updatedTodo
    } catch (error: any) {
      throw new Error(error)
    }
  }
  
  export const deleteTodo = async (
    _id: string
  ): Promise<AxiosResponse> => {
    try {
      const deletedTodo: AxiosResponse<ApiDataType> = await axios.delete(
        `${baseUrl}/delete-todo/${_id}`
      )
      return deletedTodo
    } catch (error:any) {
      throw new Error(error)
    }
  }
  