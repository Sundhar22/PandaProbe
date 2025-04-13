import { REST } from "@discordjs/rest"
import { RESTPostAPIChannelMessageResult, RESTPostAPICurrentUserCreateDMChannelResult, Routes } from "discord-api-types/v10"
import { APIEmbed } from "discord-api-types/v10"

export class DiscordClient {

  private rest: REST

  constructor(userId: string) {
    this.rest = new REST({ version: "10" }).setToken(userId || "")
  }


  async createDM(
    userId: string
  ): Promise<RESTPostAPICurrentUserCreateDMChannelResult> {
    return this.rest.post(Routes.userChannels(), {
      body: { recipient_id: userId },
    }) as Promise<RESTPostAPICurrentUserCreateDMChannelResult>
  }


  async sendEmbed(
    channelld: string,
    embed: APIEmbed
  ): Promise<RESTPostAPIChannelMessageResult> {
    return this.rest.post(Routes.channelMessages(channelld), {
      body: { embeds: [embed] },
    }) as Promise<RESTPostAPIChannelMessageResult>



  }
}
