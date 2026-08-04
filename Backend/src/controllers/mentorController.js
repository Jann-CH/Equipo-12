import * as mentorService from "../services/mentorService.js";

export async function greeting(req, res) {

  try {

    const greeting = await mentorService.getGreeting(req.user.uid);

    res.json({
      message: greeting,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: error.message,
    });

  }

}

export async function chat(req, res) {

  try {

    const { message } = req.body;

    const response = await mentorService.chat(
      req.user.uid,
      message
    );

    res.json(response);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: error.message,
    });

  }

}