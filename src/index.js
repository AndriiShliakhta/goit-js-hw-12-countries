import './sass/main.scss';

const refs = {
  daysField: document.querySelector('[data-value="days"]'),
  hoursField: document.querySelector('[data-value="hours"]'),
  minsField: document.querySelector('[data-value="mins"]'),
  secsField: document.querySelector('[data-value="secs"]'),
};

class CountdownTimer {
  constructor({ onTick, targetDate }) {
    this.onTick = onTick;
    this.targetDate = Date.now(targetDate);
    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = targetDate - currentTime;
      const time = this.getTimeComponents(deltaTime);
      updateClockface(time);
      this.onTick = time;
    }, 1000);
  }

  getTimeComponents(time) {
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
    return { days, hours, mins, secs };
  }

  pad(value) {
    return String(value).padStart(2, '0');
  }
}

function updateClockface({ days, hours, mins, secs }) {
  refs.daysField.textContent = `${days} :`;
  refs.hoursField.textContent = `${hours} :`;
  refs.minsField.textContent = `${mins} :`;
  refs.secsField.textContent = `${secs}`;
}

const countdownTimer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Aug 31, 2021'),
  onTick: updateClockface,
});


