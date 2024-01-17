import React, { useEffect, useState } from 'react';

const GuestOption = ({ label, description, onRemove, onAdd, value }) => (
  <div className='guestSelectOption'>
    <div className='guestType'>
      <div className='guestName' onClick={onRemove}>
        {label}
      </div>
      <div className='guestDescription'>{description}</div>
    </div>
    <div className='guestNumberSelect'>
      <div className='guestMinus' onClick={onRemove}>
        -
      </div>
      <div className='guestNumber'>{value}</div>
      <div className='guestPlus' onClick={onAdd}>
        +
      </div>
    </div>
  </div>
);

export const Bookings = ({ details }) => {
  const [price, setPrice] = useState(details.price);
  const [checkIn, setCheckIn] = useState(new Date());
  const [checkOut, setCheckOut] = useState(new Date());
  const [adult, setAdult] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);


  function addGuest(type) {
    switch (type) {
      case 'adult':
        setAdult(adult + 1);
        break;
      case 'children':
        setChildren(children + 1);
        break;
      case 'infants':
        setInfants(infants + 1);
        break;
      default:
        break;
    }
  }

  function removeGuest(type) {
    switch (type) {
      case 'adult':
        setAdult(adult - 1 >= 0 ? adult - 1 : 0);
        break;
      case 'children':
        setChildren(children - 1 >= 0 ? children - 1 : 0);
        break;
      case 'infants':
        setInfants(infants - 1 >= 0 ? infants - 1 : 0);
        break;
      default:
        break;
    }
  }

  function calculatePrice() {
    
    const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setPrice(details.price * diffDays );
  }

  useEffect(() => {
    if (!checkIn || !checkOut) {
      return;
    }
    calculatePrice();
  }, [checkIn, checkOut, adult, children, infants]);

//  get price breakdown from backend
  async function getPriceBreakdown() {
    // send checkin, checkout, adult, children, infants to backend
    // get price breakdown from backend

  }

  return (
    <div>
      <div className='bookingCard'>
        <div className='price'>$ {price ? price : details.price} Night </div>
        <div className='bookingCardTime'>
          <div className='bookingCardTimeCheck'>
            <div className='checkIn'>
              <label>CHECK-IN</label>
              <input
                type='date'
                value={checkIn.toISOString().split('T')[0]}
                className='dateInput'
                placeholder='Add date'
                onChange={(e) => setCheckIn(new Date(e.target.value))}
              />
            </div>
            <div className='checkOut'>
              <label>CHECKOUT</label>
              <input
                type='date'
                value={checkOut.toISOString().split('T')[0]}
                className='dateInput'
                placeholder='Add date'
                onChange={(e) => setCheckOut(new Date(e.target.value))}
              />
            </div>
          </div>
          <div className='guestNumber'>
            <div className='guestNumberTitle'>
                <div>
                <label>GUESTS</label>
                <div className='guestNumberValue'>{adult + children + infants} Guests</div>
                </div>
            
            <img className='dropdownImage' src='https://cdn-icons-png.flaticon.com/128/2985/2985149.png' onClick={() => setShowDropdown(!showDropdown)}/>
            </div>
            
            {showDropdown ? (
              <div className='guestSelect'>
                <GuestOption
                  label='ADULT'
                  description='Age 18+'
                  onRemove={() => removeGuest('adult')}
                  onAdd={() => addGuest('adult')}
                  value={adult}
                />
                <GuestOption
                  label='CHILDREN'
                  description='Ages 2-12'
                  onRemove={() => removeGuest('children')}
                  onAdd={() => addGuest('children')}
                  value={children}
                />
                <GuestOption
                  label='INFANTS'
                  description='Under 2'
                  onRemove={() => removeGuest('infants')}
                  onAdd={() => addGuest('infants')}
                  value={infants}
                />
              </div>
            ) : null}

          </div>

        </div>
        <div className='bookingReserve'>
            <button className='bookingReserveButton'>Reserve</button>
          </div>
          <div className='bookingFooterText'>
        You won't be charged yet
      </div>
      <div className='priceBreakdown'>
        <div className='priceBreakdownDetails'>
          <div className='priceBreakdownDetailsPrice'>
            <div className='priceBreakdownDetailsPriceText'>
              ${details.price} nights
            </div>
            <div className='priceBreakdownDetailsPriceValue'>
              ${details.price }
            </div>
          </div>
          <div className='priceBreakdownDetailsPrice'>
            <div className='priceBreakdownDetailsPriceText'>Cleaning Fee</div>
            <div className='priceBreakdownDetailsPriceValue'>${details.cleaning_fee ? details.cleaning_fee : 0}</div>
          </div>
          <div className='priceBreakdownDetailsPrice'>
            <div className='priceBreakdownDetailsPriceText'>Airbnb Fee</div>
            <div className='priceBreakdownDetailsPriceValue'>${details.service_fee ? details.service_fee : 0}</div>
          </div>
          <hr />
          <div className='priceBreakdownDetailsPrice'>
            <div className='priceBreakdownDetailsPriceText'>Total</div>
            <div className='priceBreakdownDetailsPriceValue'>$ {price ? price : details.price + details.cleaning_fee} </div>
          </div>
        </div>
      </div>
      </div>

    </div>
  );
};
