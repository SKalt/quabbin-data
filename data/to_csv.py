import pandas as pd
import os
if __name__ == '__main__':
    quabbin = pd.read_excel('Quabbin data request.xlsx')
    # quabbin.columns.tolist()
    # ['date', 'elevation (ft)', 'volume (mg)', 'fraction full']
    # pretty self-explanatory. A daily measurement in three equivalent forms.
    # Since there is 1 row/day,
    quabbin.to_csv('quabbin.csv', index=False)
    without_date = quabbin.loc[:, quabbin.columns != 'date']
    without_date.to_csv('without_date.csv', index=False)
