import { on, off } from "../";

const MIN_DISTANCE = 10;

function getDirection(x, y) {
    if (x > y && x > MIN_DISTANCE) {
        return "horizontal";
    }

    if (y > x && y > MIN_DISTANCE) {
        return "vertical";
    }

    return "";
}

// TouchMixin

export default {
    data() {
        return {
            direction: "",
            touchEl: null,
        };
    },
    methods: {
        touchStart(event) {
            this.resetTouchStatus();
            this.startX = event.touches[0].clientX;
            this.startY = event.touches[0].clientY;
        },

        touchMove(event) {
            const touch = event.touches[0];
            this.deltaX = touch.clientX - this.startX;
            this.deltaY = touch.clientY - this.startY;
            this.offsetX = Math.abs(this.deltaX);
            this.offsetY = Math.abs(this.deltaY);
            this.direction = this.direction || getDirection(this.offsetX, this.offsetY);
        },

        resetTouchStatus() {
            this.direction = "";
            this.deltaX = 0;
            this.deltaY = 0;
            this.offsetX = 0;
            this.offsetY = 0;
        },
        bindTouchEvent(el) {
            const { onTouchStart, onTouchMove, onTouchEnd } = this;

            on(el, "touchstart", onTouchStart);
            on(el, "touchmove", onTouchMove);

            if (onTouchEnd) {
                on(el, "touchend", onTouchEnd);
                on(el, "touchcancel", onTouchEnd);
            }
            this.touchEl = el;
        },
        unBindTouchEvent(el) {
            const { onTouchStart, onTouchMove, onTouchEnd } = this;
            off(el, "touchstart", onTouchStart);
            off(el, "touchmove", onTouchMove);
            if (onTouchEnd) {
                off(el, "touchend", onTouchEnd);
                off(el, "touchcancel", onTouchEnd);
            }
        },
    },
    destroyed() {
        let { touchEl } = this;
        if (touchEl) {
            // 解绑
            this.unBindTouchEvent(touchEl);
            this.touchEl = null;
        }
    },
};
