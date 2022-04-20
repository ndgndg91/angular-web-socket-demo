export class ChatMessage {

  private constructor(public roomId: string, public writer: string, public contents: string) {}
  public static enter(roomId: string, writer: string): ChatMessage {
    return new ChatMessage(roomId, writer, writer + ' entered.');
  }

  public static chat(roomId: string, writer: string, contents: string): ChatMessage {
    return new ChatMessage(roomId, writer, contents);
  }

  public static leave(roomId: string, writer: string): ChatMessage {
    return new ChatMessage(roomId, writer, writer + ' left.');
  }

}
