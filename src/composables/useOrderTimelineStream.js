import { onBeforeUnmount } from "vue";

// single source of truth for EventSource
let eventSource = null;

export function useOrderTimelineStream() {
    // create a new EventSource
    const initialize = () => {
      if(eventSource) return;
      eventSource = new EventSource(`${process.env.VUE_APP_API_URL}/orders/timelines`);
    }

    // close the EventSource
    const closeEventSource = () => {
      eventSource.close();
    }

    // listen for events
    const setEventListener = (callback) => {
      eventSource.onmessage = callback;
    }

    // close the EventSource when the component is unmounted
    onBeforeUnmount(() => {
      closeEventSource();
      eventSource = null;
    })
    return { initialize, closeEventSource, setEventListener }
}