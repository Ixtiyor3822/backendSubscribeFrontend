const router = require("express").Router();
const Channel = require("./../model/Channel");

/**
 * @swagger
 * components:
 *  schemas:
 *    Book:
 *      type: Object
 *      required:
 *        -name
 *        -channelId
 *        -subtitle
 *      properties:
 *        name:
 *          type: string
 *          descriotion: "Youtub kanalining linki"
 *        channelId:
 *          type: string
 *          descriotion: "Youtub kanalining id qismi"
 *        subtitle:
 *          type: string
 *          descriotion: "Youtub kanalining linki podpisatsiya linki"
 *      example:
 *        name: "https://www.youtube.com/watch?v=apouPYPh_as"
 *        channelId:
 */

// https://blog.logrocket.com/documenting-your-express-api-with-swagger/

router.get("/channels", async (req, res) => {
  try {
    const channels = await Channel.find();

    res.status(200).json({
      channels: channels.map((channel) => {
        return {
          name: channel.name,
          subtitle: channel.subtitle,
          channelId: channel.channelId,
          id: channel._id,
        };
      }),
    });
  } catch (e) {
    res.status(500).json({
      error: e,
      message: "Baza bilan bog`lanishda qandaydir muammo mavjud bo`ldi.",
    });
  }
});

router.post("/create", async (req, res) => {
  try {
    const { channel } = req.body;

    if (channel.length < 10) {
      return res.status(400).json({
        message: "Siz kiritgan channelni cho`g`i kamuuu.",
      });
    }

    const kanal = await Channel.findOne({ name: channel });

    if (kanal) {
      return res.status(401).json({
        message: "Ushbu kanal mavjud.",
      });
    }

    const matn = channel.split("/");
    const channelId = matn[matn.length - 1];

    const subtitle = matn + "?sub_confirmation=1";

    const newchannel = new Channel({
      name: channel,
      channelId: channelId,
      subtitle: subtitle,
    });

    await newchannel.save();

    res.status(201).json({
      message: "Kanal qo`shildi.",
    });
  } catch (e) {
    res.status(500).json({
      error: e,
      message: "Baza bilan bog`lanishda qandaydir muammo bo`ldi.",
    });
  }
});

router.delete("/delete", async (req, res) => {
  try {
    const { id } = req.body;

    const channel = await Channel.findByIdAndDelete({ _id: id });

    if (!channel) {
      return res.status(400).json({ message: "Bunday id li kanal yo`q ku" });
    }

    res.status(200).json({ message: "Kanal o`chirildi." });
  } catch (e) {
    res.status(500).json({
      message: "Baza bilan bog`lanishda qandaydir muammo mavjud.",
    });
  }
});

module.exports = router;
