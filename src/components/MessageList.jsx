import { Box, Text, Image, Button } from "@skynexui/components";
import appConfig from "../../config.json";
import { supabaseClient } from "../services/supabase";

export function MessageList({ messages }) {
  function deleteMessage(message) {
    console.log(message);
    supabaseClient
      .from("mensagens")
      .delete()
      .match({ id: message.id })
      .then(({ data }) => { });
    
      listenMessageRealTime((newMessage) => {
        setMessageList((actualValue) => {
          return [newMessage, ...actualValue];
        });
      });
  }
    return (
      <Box
        tag="ul"
        styleSheet={{
          overflowY: "scroll",
          display: "flex",
          flexDirection: "column-reverse",
          flex: 1,
          color: appConfig.theme.colors.neutrals["000"],
          marginBottom: "16px",
        }}
      >
        {messages.map((message) => (
          <Text
            key={message.id}
            tag="li"
            styleSheet={{
              borderRadius: "5px",
              padding: "6px",
              marginBottom: "12px",
              hover: {
                backgroundColor: appConfig.theme.colors.neutrals[700],
              },
            }}
          >
            <Box
              styleSheet={{
                marginBottom: "8px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Image
                  styleSheet={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    display: "inline-block",
                    marginRight: "8px",
                  }}
                  src={`https://github.com/${message.de}.png`}
                />
                <Text tag="strong">{message.de}</Text>
                <Text
                  styleSheet={{
                    fontSize: "10px",
                    marginLeft: "8px",
                    color: appConfig.theme.colors.neutrals[300],
                  }}
                  tag="span"
                >
                  {new Date().toLocaleDateString()}
                </Text>
              </Box>
              <Box>
                <Button
                  buttonColors={{
                    contrastColor: "#FFFFFF",
                    mainColor: "#29333D",
                    mainColorLight: "#212931",
                    mainColorStrong: "#29333D",
                  }}
                  label="x"
                  onClick={() => deleteMessage(message) }
                />
              </Box>
            </Box>
            {message.texto.startsWith(":sticker:") ? (
              <Image src={message.texto.replace(":sticker:", "")} />
            ) : (
              message.texto
            )}
          </Text>
        ))}
      </Box>
    );
  }
  