// Bus Class
class Bus {
    constructor(name, maxSeats = 30) {
      this.name = name;
      this.maxSeats = maxSeats;
      this.seats = Array(maxSeats).fill("AVAILABLE");  // Initialize all seats as "AVAILABLE"
    }
  
    viewSeats() {
      // A.3 View seats: Shows the seat number and status
      this.seats.forEach((status, index) => {
        console.log(`Seat ${index + 1}: ${status}`);
      });
    }
  
    addReservation(seatNum, customerName) {
      if (this.seats[seatNum - 1] === "AVAILABLE") {
        this.seats[seatNum - 1] = customerName;
        return true;
      }
      return false;
    }
  
    removeReservation(seatNum) {
      if (this.seats[seatNum - 1] !== "AVAILABLE") {
        this.seats[seatNum - 1] = "AVAILABLE";
        return true;
      }
      return false;
    }
  }
  
  // Ticket Person Class
  class TicketPerson {
    constructor(username, password) {
      this.username = username;
      this.password = password;
    }
  }
  
  // Reservation System Class
  class ReservationSystem {
    constructor() {
      this.users = [new TicketPerson("admin", "adminpass")];  // Predefined Ticket Person
      this.buses = [
        new Bus("Cubao"),
        new Bus("Baguio"),
        new Bus("Pasay")
      ];
      this.loggedInUser = null;
    }
  
    authenticate(username, password) {
      // A.1 User Authentication: Checks username and password
      for (let user of this.users) {
        if (user.username === username && user.password === password) {
          this.loggedInUser = user;
          return true;
        }
      }
      return false;
    }
  
    login() {
      const username = prompt("Enter username:");
      const password = prompt("Enter password:");
      if (this.authenticate(username, password)) {
        alert(`Welcome, ${username}!`);
        this.ticketPersonMenu();  // Ticket Person Menu
      } else {
        alert("Invalid username or password. Try again.");
      }
    }
  
    ticketPersonMenu() {
      // A.2 Ticket Person Menu: Options for viewing, managing, or logging out
      while (true) {
        const choice = prompt("Ticket Person Menu:\n1. View Bus Reservations\n2. Manage Bus Reservations\n3. Logout\nChoose an option:");
        
        if (choice === "1") {
          this.viewBuses();
        } else if (choice === "2") {
          this.manageBus();
        } else if (choice === "3") {
          this.logout();
          break;
        } else {
          alert("Invalid choice. Try again.");
        }
      }
    }
  
    viewBuses() {
      // A.3 View Buses: Displays the status of seats in each bus
      for (let bus of this.buses) {
        console.log(`\nBus: ${bus.name}`);
        bus.viewSeats();
      }
    }
  
    manageBus() {
      // A.4 Manage Bus: Ticket Person selects bus to manage
      const busName = prompt("Enter Bus Name to Manage (Cubao, Baguio, Pasay):");
      const bus = this.buses.find(b => b.name === busName);
      if (bus) {
        this.manageReservation(bus);
      } else {
        alert("Invalid bus name. Returning to menu.");
      }
    }
  
    manageReservation(bus) {
      // A.5 Manage Reservations: Allows adding or removing reservations
      while (true) {
        const choice = prompt("Manage Bus Reservation Menu:\n1. Add Reservation\n2. Remove Reservation\n3. Return to Previous Menu\nChoose an option:");
        
        if (choice === "1") {
          this.addReservation(bus);
        } else if (choice === "2") {
          this.removeReservation(bus);
        } else if (choice === "3") {
          break;
        } else {
          alert("Invalid choice. Try again.");
        }
      }
    }
  
    addReservation(bus) {
      // A.6 Add Reservation: Add a reservation to a free seat
      const seatNum = parseInt(prompt("Enter seat number to reserve (1-30):"));
      if (seatNum >= 1 && seatNum <= 30) {
        const customerName = prompt("Enter customer's name:");
        if (bus.addReservation(seatNum, customerName)) {
          alert(`Reservation added for ${customerName} on Seat ${seatNum}.`);
        } else {
          alert(`Seat ${seatNum} is already reserved.`);
        }
      } else {
        alert("Invalid seat number.");
      }
    }
  
    removeReservation(bus) {
      // A.7 Remove Reservation: Remove a reservation from an occupied seat
      const seatNum = parseInt(prompt("Enter seat number to remove reservation (1-30):"));
      if (seatNum >= 1 && seatNum <= 30) {
        if (bus.removeReservation(seatNum)) {
          alert(`Reservation removed for Seat ${seatNum}.`);
        } else {
          alert(`Seat ${seatNum} is available.`);
        }
      } else {
        alert("Invalid seat number.");
      }
    }
  
    logout() {
      // A.8 Logout: Logs out the user and returns to the main menu
      this.loggedInUser = null;
      alert("Logged out successfully.");
      main();
    }
  
    customerMenu() {
      // B.1 Customer Menu: Show buses and options for reserving or canceling reservations
      while (true) {
        const choice = prompt("Customer Menu:\n1. View Available Buses\n2. Reserve a Seat\n3. Cancel a Reservation\n4. Logout\nChoose an option:");
  
        if (choice === "1") {
          this.viewBusesForCustomer();
        } else if (choice === "2") {
          this.reserveSeat();
        } else if (choice === "3") {
          this.cancelReservation();
        } else if (choice === "4") {
          break;
        } else {
          alert("Invalid choice. Try again.");
        }
      }
    }
  
    viewBusesForCustomer() {
      // B.2 View Available Buses: Displays available seats or "Fully Booked"
      console.log("\nAvailable Buses:");
      for (let bus of this.buses) {
        const availableSeats = bus.seats
          .map((status, index) => status === "AVAILABLE" ? index + 1 : null)
          .filter(seat => seat !== null);
  
        if (availableSeats.length > 0) {
          console.log(`${bus.name}: Available Seats ${availableSeats.join(", ")}`);
        } else {
          console.log(`${bus.name}: Fully Booked`);
        }
      }
    }
  
    reserveSeat() {
      // B.3 Reserve a Seat: Customer selects bus and seat to reserve
      const busName = prompt("Enter Bus Name to Reserve (Cubao, Baguio, Pasay):");
      const bus = this.buses.find(b => b.name === busName);
      if (bus) {
        const availableSeats = bus.seats
          .map((status, index) => status === "AVAILABLE" ? index + 1 : null)
          .filter(seat => seat !== null);
  
        if (availableSeats.length > 0) {
          const seatNum = parseInt(prompt(`Available seats: ${availableSeats.join(", ")}\nEnter seat number to reserve:`));
          if (availableSeats.includes(seatNum)) {
            const customerName = prompt("Enter your name:");
            if (bus.addReservation(seatNum, customerName)) {
              alert(`Reservation successful for ${bus.name}, Seat ${seatNum}.`);
            } else {
              alert(`Seat ${seatNum} is already reserved.`);
            }
          } else {
            alert("Invalid seat number.");
          }
        } else {
          alert(`${bus.name} is Fully Booked.`);
        }
      } else {
        alert("Invalid bus name.");
      }
    }
  
    cancelReservation() {
      // B.5 Cancel Reservation: Customer cancels reservation
      const busName = prompt("Enter the Bus name to cancel reservation (Cubao, Baguio, Pasay):");
      const bus = this.buses.find(b => b.name === busName);
      if (bus) {
        const seatNum = parseInt(prompt("Enter seat number to cancel reservation (1-30):"));
        const customerName = prompt("Enter your name:");
        if (bus.seats[seatNum - 1] === customerName) {
          if (bus.removeReservation(seatNum)) {
            alert(`Reservation cancelled for Seat ${seatNum}.`);
          } else {
            alert(`Seat ${seatNum} is not reserved under your name.`);
          }
        } else {
          alert(`Seat ${seatNum} is not reserved under your name.`);
        }
      } else {
        alert("Invalid bus name.");
      }
    }
  }
  
  // Main Program Loop
  function main() {
    const system = new ReservationSystem();
  
    while (true) {
      const choice = prompt("Welcome to the Bus Reservation System\n1. Ticket Person Login\n2. Customer Login\n3. Exit\nChoose an option:");
  
      if (choice === "1") {
        system.login();
      } else if (choice === "2") {
        system.customerMenu();
      } else if (choice === "3") {
        break;
      } else {
        alert("Invalid choice. Try again.");
      }
    }
  }
  
  // Start the program
  main();
  
