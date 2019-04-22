"""
A function for flexible datetime parsing. Tweaked from :
http://code.activestate.com/recipes/578245-flexible-datetime-parsing/
"""

from datetime import datetime
from itertools import permutations


def str2date(string):
    """Parse a string into a datetime object."""

    for fmt in dateformats():
        try:
            return (datetime.strptime(string.replace(',', ' '), fmt)).year
        except ValueError:
            pass
    raise ValueError("'%s' is not a recognized date/time" % string)


def dateformats():
    """Yield all combinations of valid date formats."""

    years = ("%Y",)
    months = ("%b", "%B", "")
    days = ("%d", "")
    # times = ("%I%p", "%I:%M%p", "%H:%M", "")

    for year in years:
        for month in months:
            for day in days:
                for args in ((day, month), (month, day)):
                    date = " ".join(args)
                    for combo in permutations([year, date]):
                        yield " ".join(combo).strip()
                    # removed time/times for faster processing
                    # for time in times:
                    #     for combo in permutations([year, date, time]):
                    #         yield " ".join(combo).strip()
