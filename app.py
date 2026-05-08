from flask import Flask, render_template, request

app = Flask(__name__)

def calculate_salary(hours_per_day, days_per_month, months_worked, regular_rate, overtime_hours, overtime_rate, monthly_bonus, annual_bonus, tax_rate):
    # Base Regular Salary
    total_regular_hours = hours_per_day * days_per_month * months_worked
    regular_salary = total_regular_hours * regular_rate

    # Overtime Calculation
    # Monthly overtime hours * months * (hourly rate * multiplier)
    overtime_salary = (overtime_hours * months_worked) * (regular_rate * overtime_rate)

    # Bonuses
    total_monthly_bonus = monthly_bonus * months_worked
    total_annual_bonus = annual_bonus # Assuming annual bonus is already total for the year

    # Gross Salary
    total_salary_before_tax = regular_salary + overtime_salary + total_monthly_bonus + total_annual_bonus

    # Tax
    tax_deduction = total_salary_before_tax * (tax_rate / 100)

    # Net Salary
    net_salary = total_salary_before_tax - tax_deduction

    return {
        'regular_salary': regular_salary,
        'overtime_salary': overtime_salary,
        'total_monthly_bonus': total_monthly_bonus,
        'total_annual_bonus': total_annual_bonus,
        'total_salary_before_tax': total_salary_before_tax,
        'tax_deduction': tax_deduction,
        'net_salary': net_salary
    }

@app.route('/', methods=['GET', 'POST'])
def index():
    results = {
        'hours_per_day': None,
        'days_per_month': None,
        'months_worked': None,
        'regular_rate': None,
        'overtime_hours': None,
        'overtime_rate': None,
        'monthly_bonus': None,
        'annual_bonus': None,
        'tax_rate': None,
        'net_salary': None,
        'error': None
    }

    if request.method == 'POST':
        try:
            # Extract inputs
            inputs = {
                'hours_per_day': float(request.form.get('hours_per_day', 0)),
                'days_per_month': int(request.form.get('days_per_month', 0)),
                'months_worked': int(request.form.get('months_worked', 0)),
                'regular_rate': float(request.form.get('regular_rate', 0)),
                'overtime_hours': float(request.form.get('overtime_hours', 0)),
                'overtime_rate': float(request.form.get('overtime_rate', 1.5)),
                'monthly_bonus': float(request.form.get('monthly_bonus', 0)),
                'annual_bonus': float(request.form.get('annual_bonus', 0)),
                'tax_rate': float(request.form.get('tax_rate', 0))
            }

            # Update results with input values for keeping form state
            results.update(inputs)

            # Validation
            if any(v < 0 for v in inputs.values()):
                results['error'] = "Values cannot be negative."
                return render_template('index.html', **results)

            # Calculate
            calc_results = calculate_salary(**inputs)
            results.update(calc_results)

        except ValueError:
            results['error'] = "Invalid input. Please enter valid numbers."

    return render_template('index.html', **results)

if __name__ == '__main__':
    app.run(debug=True)
