import rx
from rx.operators import buffer, distinct
from rx.operators import map as rx_map


def heartbeat(liveliness):
    """
    Projects a source observable sequence to a boolean. The resulting value is True when there
    is an observable emitted within the liveliness factor and False otherwise.
    Args:
        liveliness: The amount of time between each event for the observable to be considered
        alive. Note that an observable may stay alive for up to 2x liveliness between each
        event as this operator checks for items emitted between this window.
    """
    # FIXME: This implementation is slow as it takes "liveliness" time for status to be updated.
    return rx.pipe(
        buffer(rx.interval(liveliness)),
        rx_map(lambda items: len(items) > 0),
        distinct(),
    )
