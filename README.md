# TabledIn


## What Is [TabledIn](https://tabledin.herokuapp.com)?

TabledIn is an integrated bookings tool that allows restaurant owners to manage their schedules and configure their own chatbot agent for taking reservations.


## The Idea Behind the Project

Not everyone is a fan of talking on the phone, which can turn booking a table at a restaurant into an unnecessary hassle. On the other hand, even though some restaurants offer booking apps, one doesn’t always have a hand free to use an app or website, e.g. when driving.

With TabledIn we wanted to build a web app which offers restaurant owners an easy and intuitive way to manage their bookings, as well as an alternative gateway to gain new customers by offering restaurant visitors the ability to book a table by using Google Assistant. 


## The Project

TabledIn was built as a final project for the Ironhack Berlin Web Dev Bootcamp August 2019 by Marko Milovanov and Sarah Houben within a timeframe of 9 days. 

To build the project, the overall idea was broken down into separate iterations, insuring that the result of each iteration produced an in-itself functional mini-web-app. An overview over the project structure can be viewed [here](https://trello.com/b/FjhhyXK2/tabledin). 


## How It Works

### The Components

TabledIn comprises out of two main components:

I) A single page web app built with React which is aimed at restaurant owners. The frontend was built mobile first so that       restaurant owners or their staff can add bookings at any time.

Upon signing up, restaurant owners fill out a form with all the restaurant details, most importantly their opening times and the number of their available tables, as well as the number of guests each table can seat. This information can be changed later by the user via the “Edit Restaurant Information form”.

Bookings can be viewed and deleted under “bookings”, whilst new bookings can be added via “add bookings”.  On the planner-page, restaurant owners can edit the opening times for individual days or set individual days as closed, e.g. they might want to have shorter opening times or close on a public holiday.

II) A chatbot integrated in Google Assistant which enables restaurant customers to make a reservation at a restaurant signed up with TabledIn. To do this, the user first needs to invoke TabledIn in Google Assistant by saying “OK Google, Talk to TabledIn”. Upon being greeted by the TabledIn-chatbot, the user can then name the restaurant they would like to book or cancel a table at. If that restaurant is signed up with TabledIn, the user will be connected with the desired restaurant and can then ask to book or cancel a table. When booking or cancelling a table, the chatbot asks for permission to get the user’s name from Google. Once permission has been granted, the booking is made/cancelled under the user’s name.

### How Does the Chatbot Work?

To use TabledIn, user opens Google Assistant and invokes TabledIn by saying “OK Google, talk to TabledIn”. They then choose a restaurant, e.g. by saying “I want to talk to Pizzeria Da Toni”. By doing this, they send a so called “intent” with their message, namely the restaurant name “Pizzeria Da Toni”. Upon receiving the intent, Dialogflow waits for with the user’s “follow-up intent”, making or cancelling a reservation. As such, the user might say “I want to book a table”, thus calling the reservation-follow-up-intent.

When the follow-up-intent has been identified, the chatbot queries the user until all required information for the execution of the intent has been collected. In the case of a reservation, this would be the date of the booking, the number of guests and the arrival time. 

Once all required information has been gathered the Dialogflow Apo service sends a response via the TabledIn webhook. Consequently, the intent is fulfilled via the database and the TabledIn webapp (e.g. the database is checked to see whether there is a free table on the required day and during the requested time).

The fulfillment-response is then sent back to Dialogflow and the user receives the result of their query, e.g. “A booking has been made” or “I’m sorry, we have no free tables on this day”.

![alt text](https://github.com/SarahHouben/TabledIn/blob/master/client/public/Chatbot_TabledIn.png "TabledIn Chatbot")

### How Are Bookings Made?

The TabledIn database contains four different collections which are involved in the process of making a booking at a restaurant: The Restaurant-collection which for each restaurant holds a document with the restaurant information such as name, opening times, table number and table capacity; a Schedule-collection with schedules (opening times) for individual days, a Tables-collection with a document for each table and the tables open time-slots on a given day, and a Bookings-collection with all the bookings made at a restaurant.

When a restaurant owner or Google Assistant user wants to make a booking via the TabledIn web app or chatbot, the database is checked to see whether there is a schedule for the requested day. If there is no schedule, a schedule-document for the day is created using the restaurant opening-times in the restaurant-document.

In the next step, the schedule for the day is checked to see whether the restaurant is open on that day and time. If the answer is negative, the user receives a reply, informing them that the restaurant is closed. 

If the restaurant is open, the table documents for the day are either created (in the case that there was no previous schedule for the day) and checked, or immediately checked in order to see whether there is a table with a free time slot during the required time for the reservation and with sufficient capacity for the number of guests of the booking. 
If there is no free table, a message is sent to the user, informing them of this. If there is a free table, a booking-document with the Id of the designated table, the timeslot, date and the information of the guest is created and a message is sent back to the user, confirming the booking.

![alt text](https://github.com/SarahHouben/TabledIn/blob/master/client/public/Reservations_TabledIn.png "TabledIn Reservations")


## Technology Used

The web app was built using ReactJS, Node.js, Express.js, Passport.js, MongoDB, Mongoose ODM & SASS

The chatbot was built using Google Dialogflow.


## Future Improvements

In the future, we are aiming to automate the creation of new restaurant-intents for the TabledIn chatbot. That would mean that each time a new restaurant signs up to use the TabledIn web-app and opts in for the chatbot option, an intent with the name of the restaurant would be created for the TabledIn Chabot, enabling users to then also book tables at that newly added restaurant via Google Assistant. 
Due to time constraints, this was not possible during the actual project phase, however the app has been built in such a way, that the additional logic can simply be added. Currently, new restaurant-intents can already be added manually to Dialogflow and two fictional restaurants with individual intents (*Pizzeria Da Toni* and *Nora’s Garden*) are already signed up.

In addition, we would like to add a further integration to the chatbot with Phone Gateway. Phone Gateway would the same TabledIn-functionalities as Google Assistant, only that users could directly call a number and talk to the chatbot via phone instead of using Google Assistant. As Phone Gateway to date is still in the Beta phase and only provides a US-American phone number, we have not yet been able to use this integration.


## Test It Out

If you would like to test the full functionality of TabledIn, click on this [link](https://assistant.google.com/services/a/uid/000000691425a561?hl=de) to sign up for the Alpha testing-stage of the chatbot with a gmail account, or get in touch with Marko or Sarah to be added to the tester-list. 

Once signed up, open Google Assistant and action TabledIn by saying *"Ok Google, talk to TabledIn"*. You will be asked to choose a restaurant. Currently you have the choice between the restaurants *"Nora's Garden"* and *"Pizzeria Da Toni"*. You can choose to make a reservation or to cancel a reservation under your name.

To view the bookings you have added via the chatbot, log into the web app using the credentials *"Toni"* and password *"testtest"* for *"Pizzeria Da Toni"* or *"Nora"* and password *"testtest"* for *"Nora's Garden"*.

Alternatively, simply create a new free account on the webapp to view the restaurant bookings platform.
